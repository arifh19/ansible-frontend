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
                                        sourceFiles: "hosts",
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
                                        sourceFiles: "builder.yml",
                                        remoteDirectory: "${REMOTE_DIR}",
                                        execCommand: "ansible-playbook -i hosts builder.yml --extra-vars 'branch=${BRANCH_NAME}'",
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
                                        sourceFiles: "testing.yml",
                                        remoteDirectory: "${REMOTE_DIR}",
                                        execCommand: "ansible-playbook -i hosts testing.yml --extra-vars 'branch=${BRANCH_NAME}'",
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
                                            sourceFiles: "deploy.yml",
                                            remoteDirectory: "${REMOTE_DIR}",
                                            execCommand: "ansible-playbook -i hosts deployProd.yml --extra-vars 'branch=${BRANCH_NAME}'",
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
                                            sourceFiles: "deploy.yml",
                                            remoteDirectory: "${REMOTE_DIR}",
                                            execCommand: "ansible-playbook -i hosts deployDev.yml --extra-vars 'branch=${BRANCH_NAME}'",
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
