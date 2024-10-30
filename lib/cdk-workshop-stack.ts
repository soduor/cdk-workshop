import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";



export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const cdkWorkshopBucket = new s3.Bucket(this, 'WebAppBucket', {
        bucketName: 'soduor-cdk-workshop-website-bucket',
        websiteIndexDocument: 'index.html',
    });

    const myOriginAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OAI', {
        comment: 'Allows CloudFront to reach the bucket'
    });

    const s3Origin = origins.S3BucketOrigin.withOriginAccessIdentity(cdkWorkshopBucket, {
        originAccessIdentity: myOriginAccessIdentity
    });

    new cloudfront.Distribution(this, 'WebAppDistribution', {
        defaultBehavior: {
            origin: s3Origin,
            viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: 'index.html',
        });

  }
}
