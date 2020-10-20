def builderDocker
def CommitHash
def REPO = 'arifh19/restaurant-frontend'
def BRANCH_DEV = 'dev'
def BRANCH_PROD = 'master'
def REMOTE_DIR = 'ansibleFrontend'

pipeline {
    agent any
    parameters {
        booleanParam(name: 'RunTest', defaultValue: true, description: 'Toggle this value for testing')
        choice(name: 'CICD', choices: ['CI', 'CICD'], description: 'Pick something')
    }
    stages {
        stage('Build project') {
            steps {
                nodejs('nodejs12') {
                    sh 'yarn install'
                }
            }
        }
        stage('Run Testing') {
            when {
                expression {
                    params.RunTest
                }
            }
            steps {
                echo 'passed'
            }
        }
        stage('Generate Host') {
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ctrl-node',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: "ansible/hosts",
                                        remoteDirectory: "${REMOTE_DIR}",
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ctrl-node',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: "ansible/vars.yml",
                                        remoteDirectory: "${REMOTE_DIR}",
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ctrl-node',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: "ansible/builder.yml",
                                        remoteDirectory: "${REMOTE_DIR}",
                                        execCommand: "ansible-playbook -i ansibleFrontend/hosts ansibleFrontend/builder.yml --extra-vars 'branch=${BRANCH_NAME}'",
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
        stage('Test Container') {
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'ctrl-node',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: "ansible/testing.yml",
                                        remoteDirectory: "${REMOTE_DIR}",
                                        execCommand: "ansible-playbook -i ansibleFrontend/hosts ansibleFrontend/testing.yml --extra-vars 'branch=${BRANCH_NAME}'",
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if (BRANCH_NAME == BRANCH_PROD) {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'ctrl-node',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            sourceFiles: "ansible/deploy.yml",
                                            remoteDirectory: "${REMOTE_DIR}",
                                            execCommand: "ansible-playbook -i ansibleFrontend/hosts ansibleFrontend/deployProd.yml --extra-vars 'branch=${BRANCH_NAME}'",
                                            execTimeout: 120000,
                                        )
                                    ]
                                )
                            ]
                        )
                    } else {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'ctrl-node',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            sourceFiles: "ansible/deploy.yml",
                                            remoteDirectory: "${REMOTE_DIR}",
                                            execCommand: "ansible-playbook -i ansibleFrontend/hosts ansibleFrontend/deployDev.yml --extra-vars 'branch=${BRANCH_NAME}'",
                                            execTimeout: 120000,
                                        )
                                    ]
                                ),
                            ]
                        )
                    }
                    
                }
            }
        }
    }
}
