export const PIPELINE_PARAMS = {
  "pipeline": {
    "name": "cdk-workshop-pipeline-develop",
    "roleArn": "arn:aws:iam::239016867325:role/CdkWorkshopPipelineStack-PipelineRoleB27FAA37-hrwOUBBsZww0",
    "artifactStore": {
      "type": "S3",
      "location": "cdkworkshoppipelinestack-pipelineartifactsbucketae-jp0ncmi0nudj"
    },
    "stages": [
      {
        "name": "Source",
        "actions": [
          {
            "name": "soduor_cdk-workshop",
            "actionTypeId": {
              "category": "Source",
              "owner": "AWS",
              "provider": "CodeStarSourceConnection",
              "version": "1"
            },
            "runOrder": 1,
            "configuration": {
              "BranchName": "develop",
              "ConnectionArn": "arn:aws:codeconnections:us-east-1:239016867325:connection/6b30236e-d1e5-49e0-b91d-1a04148efc1c",
              "DetectChanges": "true",
              "FullRepositoryId": "soduor/cdk-workshop"
            },
            "outputArtifacts": [
              {
                "name": "soduor_cdk_workshop_Source"
              }
            ],
            "inputArtifacts": [],
            "roleArn": "arn:aws:iam::239016867325:role/CdkWorkshopPipelineStack-PipelineSourcesoduorcdkwor-XDn0DnTHxvWK"
          }
        ]
      },
      {
        "name": "Build",
        "actions": [
          {
            "name": "Synth",
            "actionTypeId": {
              "category": "Build",
              "owner": "AWS",
              "provider": "CodeBuild",
              "version": "1"
            },
            "runOrder": 1,
            "configuration": {
              "EnvironmentVariables": "[{\"name\":\"_PROJECT_CONFIG_HASH\",\"type\":\"PLAINTEXT\",\"value\":\"45eed4da1abb67786dce73ff691d467e7bbe6efe57e97eacca4d049a554bf2f9\"}]",
              "ProjectName": "PipelineBuildSynthCdkBuildP-22D9FPrmYXHg"
            },
            "outputArtifacts": [
              {
                "name": "Synth_Output"
              }
            ],
            "inputArtifacts": [
              {
                "name": "soduor_cdk_workshop_Source"
              }
            ],
            "roleArn": "arn:aws:iam::239016867325:role/CdkWorkshopPipelineStack-PipelineCodeBuildActionRol-eRc6fz3tpFHR"
          }
        ]
      },
      {
        "name": "UpdatePipeline",
        "actions": [
          {
            "name": "SelfMutate",
            "actionTypeId": {
              "category": "Build",
              "owner": "AWS",
              "provider": "CodeBuild",
              "version": "1"
            },
            "runOrder": 1,
            "configuration": {
              "EnvironmentVariables": "[{\"name\":\"_PROJECT_CONFIG_HASH\",\"type\":\"PLAINTEXT\",\"value\":\"f4c6f6770eb00299570ee0ecaf3b91fc70775d09e391684c0b34cb71a35e17b9\"}]",
              "ProjectName": "cdk-workshop-pipeline-selfupdate"
            },
            "outputArtifacts": [],
            "inputArtifacts": [
              {
                "name": "Synth_Output"
              }
            ],
            "roleArn": "arn:aws:iam::239016867325:role/CdkWorkshopPipelineStack-PipelineCodeBuildActionRol-eRc6fz3tpFHR"
          }
        ]
      },
      {
        "name": "Deploy",
        "actions": [
          {
            "name": "Prepare",
            "actionTypeId": {
              "category": "Deploy",
              "owner": "AWS",
              "provider": "CloudFormation",
              "version": "1"
            },
            "runOrder": 1,
            "configuration": {
              "ActionMode": "CHANGE_SET_REPLACE",
              "Capabilities": "CAPABILITY_NAMED_IAM,CAPABILITY_AUTO_EXPAND",
              "ChangeSetName": "PipelineChange",
              "RoleArn": "arn:aws:iam::239016867325:role/cdk-hnb659fds-cfn-exec-role-239016867325-us-east-1",
              "StackName": "Deploy-CdkWorkshopStack",
              "TemplatePath": "Synth_Output::assembly-CdkWorkshopPipelineStack-Deploy/CdkWorkshopPipelineStackDeployCdkWorkshopStackCD04B42A.template.json"
            },
            "outputArtifacts": [],
            "inputArtifacts": [
              {
                "name": "Synth_Output"
              }
            ],
            "roleArn": "arn:aws:iam::239016867325:role/cdk-hnb659fds-deploy-role-239016867325-us-east-1"
          },
          {
            "name": "Deploy",
            "actionTypeId": {
              "category": "Deploy",
              "owner": "AWS",
              "provider": "CloudFormation",
              "version": "1"
            },
            "runOrder": 2,
            "configuration": {
              "ActionMode": "CHANGE_SET_EXECUTE",
              "ChangeSetName": "PipelineChange",
              "StackName": "Deploy-CdkWorkshopStack"
            },
            "outputArtifacts": [],
            "inputArtifacts": [],
            "roleArn": "arn:aws:iam::239016867325:role/cdk-hnb659fds-deploy-role-239016867325-us-east-1"
          }
        ]
      }
    ]
  }
}