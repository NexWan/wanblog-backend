import {defineFunction, secret } from '@aws-amplify/backend'

export const postConfirmation = defineFunction({
    name: 'post-confirmation',
    environment: {
        ADMIN_EMAILS: secret('ADMIN_EMAILS')
    },
})