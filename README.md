# AutoML File API - Create Folder 

HTTP Triggered Google Cloud Function for creating Folder Entries in Firestore

## Bitbucket Configuration

The bucket pipeline requires the following variables for **BOTH** **Test** and **Production** deployment environments.

### Environments Variables

Variable | Usage
--------- | -----------
SLS_STAGE | Serverless Stage, valid parameters are ``dev`` and ``prod``.
GCP_PROJECT | Project ID to deploy to.
GCP_REGION | Region to deploy to.
GCP_KEY_FILE | base64 encoded contents of the GCP key file

## Prerequisites

* You will also need credentials for the cloud provider you will be deploying to.
* Check out the documentation for the cloud provider you are interested in the official serverless documentation.

_Google Cloud Platform:_

* Create a GCP project.
* Create an IAM member with at least a minimum set of roles: ``Deployment Manager Editor``, ``Storage Admin``, ``Logging Admin``, ``Cloud Functions Developer`` and other needed for your resources.
* Create service account for your project.
* Create, download and save private_key.json. You will use it as your credentials in the serverless.yml.
* Enable the Cloud Functions API.
* Enable the Cloud Deployment Manager V2 API.
* Enable the Cloud Storage.
* Enable the Stackdriver Logging

For base64 encoded contents required by GCP_KEY_FILE variable use command:

Linux

```bash
base64 -w 0 < GCP_key
```

## Create Folder

> To create a folder entry, use this snippet:

```shell
curl 'https://"$BASE_URL"/create_folder' \
  -X POST \
  -H "Content-Type: application/json" \
  -d @request.json
```

> In request.json:

```json
{
  "name": "New Folder"
}
```

> The above command returns JSON structured like this:

```json
{
  "message": "Folder Created",
  "payload": {
    "id": "ad603de7-ab99-46eb-95bd-d0e47b793678",
    "name": "New Folder",
    "created_at": "1579517552",
    "updated_at": "1579517552"
  }
}
```

This endpoint creates a folder entry in Firestore

#### HTTP Request

`POST /create_folder`

#### Request Body

Parameter | Type | Description
--------- | ---- | -----------
name | string | **Required**. The folder's display name.

#### Response Body

Parameter | Type | Description
--------- | ---- | -----------
message | string | Message.
payload | Folder | Created folder entry.
error | string | Error.

#### Status Code

Code | Description
--------- | -----------
200 | Folder created.
400 | Bad request.

## Folder Interface

### Parameters 

Name | Type | Description
--------- | ---- | -----------
id | string | Unique id of the Folder.
name | string | Folder Name
created_at | Timestamp | Created Date
updated_at | Timestamp | Last Updated Date
