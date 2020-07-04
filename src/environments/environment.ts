// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
