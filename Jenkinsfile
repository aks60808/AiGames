
//DECLARATIVE
pipeline {
	agent any
	tools {nodejs "MyNodeJS"}
	environment {
		dockerHome = tool 'MyDocker'
		PATH = "$dockerHome/bin:$PATH"
		PROJECT_ID = "test-aigame"   
		CICD_SSH_CRED_ID = "cicd-ssh-key"
		GIT_REPO = "https://github.com/aks60808/AiGames"
	}
	stages {
		stage('Checkout') {
			steps {
				sh 'docker version'
				echo "Build"
				echo "PATH - $PATH"
				echo "BUILD_NUMBER - $env.BUILD_NUMBER"
				echo "BUILD_ID - $env.BUILD_ID"
				echo "JOB_NAME - $env.JOB_NAME"
				echo "BUILD_TAG - $env.BUILD_TAG"
				echo "BUILD_URL - $env.BUILD_URL"
			}
		}
		stage('Clone from github'){
			steps{
				echo 'Make the output directory'
				sh 'mkdir -p build'
				dir('build') {
          			git branch: "master", url: "${GIT_REPO}"
      			}     
			}
		}
		stage('Compile') {
			steps {
				dir('build') {
          			sh "npm install --silent"
					sh "echo npm install succeeded"
      			}   
			}
		}
		stage('Unit Test'){
			steps{
				dir('build') {
          			sh "npm test -- --watchAll=false"
      			}   
				
			}
		}
		stage('Docker Image build up'){
			steps{
				script{
					dockerImage = docker.build("asia.gcr.io/${PROJECT_ID}/aigames:$env.BUILD_TAG")
				}
			}
		}
		stage('Push to Google Container Registry'){
			steps{
				sh "gcloud auth activate-service-account  --key-file=$HOME/key.json"
		        sh "gcloud auth configure-docker"
				script {
					docker.withRegistry("https://asia.gcr.io/${PROJECT_ID}/") {
						dockerImage.push();
						dockerImage.push('latest');
					}
				}
			}
		}
		stage('Deploy to Deployment Server'){
			steps{
				script{
				
			        ansiblePlaybook becomeUser: null, credentialsId: "${CICD_SSH_CRED_ID}", inventory: '/etc/ansible/hosts', playbook: '/var/lib/jenkins/ansible_deployment.yml'
			    }
				}
			}
		}
	
	post {
		always {
			echo 'CICD pipeline operation compelted'
		}
		success {
			echo 'I run when you are successful'
		}
		failure {
			echo 'I run when you fail'
		}
	}
	
}
