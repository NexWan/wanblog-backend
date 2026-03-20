import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient();

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '').split(',')

export const handler: PostConfirmationTriggerHandler = async (event) => {
    const email = event.request.userAttributes.email;
    const userPoolId = event.userPoolId;
    const username = event.userName;
    const group = ADMIN_EMAILS.includes(email) ? 'admin' : 'guest';

    await client.send(new AdminAddUserToGroupCommand({
        UserPoolId: userPoolId,
        Username: username,
        GroupName: group
    }))

    return event;
}