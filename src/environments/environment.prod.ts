export const environment = {
    production: true,
    hmr       : false,
    cognitoPool: {
        region: 'us-west-2',
        UserPoolId: "us-west-2_oUDeQcE5u",
        ClientId: "1g9usum5nc2ohe2f9m8h7gq4bo",
        
        identityPoolId: '',
        rekognitionBucket: 'rekognition-pics',
        albumName: "usercontent",
        bucketRegion: 'us-west-2',

        ddbTableName: 'LoginTrail', 

        cognito_idp_endpoint: '',
        cognito_identity_endpoint: '',
        sts_endpoint: '',
        dynamodb_endpoint: '',
        s3_endpoint: ''

    }  

};
