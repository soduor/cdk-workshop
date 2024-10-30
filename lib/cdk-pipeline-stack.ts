import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {CodePipeline, CodeBuildStep, CodePipelineSource} from "aws-cdk-lib/pipelines";
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class CdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const connectionArnParameter = ssm.StringParameter.valueForStringParameter(this, 'CDKWORKSHOP_CONNECTION')

    const source = CodePipelineSource.connection(
        'soduor/cdk-workshop',
        'main',
        {
            connectionArn: connectionArnParameter,
            triggerOnPush: true
        })

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'cdk-workshop-pipeline',
      synth: new CodeBuildStep('Synth', {
        input: source,
        commands: ['yarn install --frozen-lockfile', 'yarn build', 'yarn cdk synth']
      })
    })

  }
}