import { CodePipelineClient, CreatePipelineCommand } from "@aws-sdk/client-codepipeline";
import {PIPELINE_PARAMS} from "./pipeline-params";

exports.handler = async (event) => {

    console.log('request', JSON.stringify(event, undefined, 2));



    return{
        statusCode: 200,
        headers: {
            "Content-Type": "text/plain",
        },
        body: `Hello, CDK! You've hit ${event.path}\n`
    }
}