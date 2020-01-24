# functional-firestore

## functional-firestore

### Modules

* ["Arbitraries"](#arbitraries)
* ["Emulator"](#emulator)
* ["Firestore"](#firestore)
* ["TaskEitherUtils"](#taskeitherutils)
* ["index"](#index)

# README

[functional-firestore](#readme) › [Globals](#globals)

## functional-firestore

### functional-firestore

#### Index

##### Interfaces

* [Model](#model)

##### Variables

* [firestore](#const-firestore)
* [getModelFromCollection](#const-getmodelfromcollection)
* [getModelFromFirestore](#const-getmodelfromfirestore)
* [getModelFromSnapshot](#const-getmodelfromsnapshot)
* [getSnapshotFromCollection](#const-getsnapshotfromcollection)
* [getSnapshotFromDocument](#const-getsnapshotfromdocument)
* [storeModelToCollection](#const-storemodeltocollection)
* [storeModelToDocument](#const-storemodeltodocument)
* [storeModelToFirestore](#const-storemodeltofirestore)
* [validateModel](#const-validatemodel)
* [validateSnapshotExistence](#const-validatesnapshotexistence)

##### Functions

* [clearEmulator](#const-clearemulator)
* [clearFirestore](#const-clearfirestore)
* [fromTask](#const-fromtask)
* [getCollectionFromFirestore](#const-getcollectionfromfirestore)
* [getDataFromSnapshot](#const-getdatafromsnapshot)
* [getDocumentFromCollection](#const-getdocumentfromcollection)
* [getFirestore](#const-getfirestore)
* [getSnapshotFromDocumentTask](#const-getsnapshotfromdocumenttask)
* [id](#const-id)
* [isModel](#const-ismodel)
* [listCollectionsInFirestore](#const-listcollectionsinfirestore)
* [model](#const-model)
* [modelBase](#const-modelbase)
* [modelData](#const-modeldata)
* [models](#const-models)
* [nonModelObject](#const-nonmodelobject)
* [storeModelToDocumentTask](#const-storemodeltodocumenttask)
* [storeModelToFirestoreWith](#const-storemodeltofirestorewith)
* [table](#const-table)

#### Variables

##### `Const` firestore

• **firestore**: *Firestore‹›* = new Firestore({
  projectId: 'gcloud-project',
})

Defined in src/Emulator.ts:7

**`internal`** 

**`type`** {FirebaseFirestore.Firestore}

___

##### `Const` getModelFromCollection

• **getModelFromCollection**: *function* = pipe(
  getSnapshotFromCollection,
  RTE.chainEitherK(getModelFromSnapshot)
)

Defined in src/Firestore.ts:201

```
getModelFromCollection :: Collection -> ReaderTaskEither Model Model Error
```

###### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#model), Error, [Model](#model)›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

##### `Const` getModelFromFirestore

• **getModelFromFirestore**: *function* = pipe(
  getCollectionFromFirestore,
  R.map(getModelFromCollection)
)

Defined in src/Firestore.ts:213

```
getModelFromFirestore :: Firestore -> Reader String (ReaderTaskEither Model Model Error)
```

###### Type declaration:

▸ (`firestore`: Firestore): *Reader‹string, ReaderTaskEither‹[Model](#model), Error, [Model](#model)››*

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore |

___

##### `Const` getModelFromSnapshot

• **getModelFromSnapshot**: *function* = pipe(
  validateSnapshotExistence,
  E.map(getDataFromSnapshot),
  E.chain(validateModel)
)

Defined in src/Firestore.ts:188

```
getModelFromSnapshot :: Snapshot -> Either Model Error
```

###### Type declaration:

▸ (`snapshot`: DocumentSnapshot): *E.Either‹Error, [Model](#model)›*

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | DocumentSnapshot |

___

##### `Const` getSnapshotFromCollection

• **getSnapshotFromCollection**: *function* = pipe(
  getDocumentFromCollection,
  R.map(getSnapshotFromDocument)
)

Defined in src/Firestore.ts:144

**`internal`** 
```
getSnapshotFromCollection :: Collection -> ReaderTaskEither Model Snapshot Error
```

###### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#model), Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

##### `Const` getSnapshotFromDocument

• **getSnapshotFromDocument**: *function* = pipe(
  getSnapshotFromDocumentTask,
  TEUtils.fromTask
)

Defined in src/Firestore.ts:131

```
getSnapshotFromDocument :: Document -> TaskEither Snapshot Error
```

###### Type declaration:

▸ (`document`: DocumentReference): *TaskEither‹Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference |

___

##### `Const` storeModelToCollection

• **storeModelToCollection**: *function* = pipe(
  getDocumentFromCollection,
  R.chain(storeModelToDocument)
)

Defined in src/Firestore.ts:82

```
storeModelToCollection :: Collection -> String -> ReaderTaskEither Model Model Error
```

###### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#model), Error, [Model](#model)›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

##### `Const` storeModelToDocument

• **storeModelToDocument**: *function* = pipe(
  storeModelToDocumentTask,
  R.map(TEUtils.fromTask)
)

Defined in src/Firestore.ts:70

```
storeModelToDocument :: Document -> ReaderTaskEither Model Model Error
```

###### Type declaration:

▸ (`document`: DocumentReference): *ReaderTaskEither‹[Model](#model), Error, [Model](#model)›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference |

___

##### `Const` storeModelToFirestore

• **storeModelToFirestore**: *function* = pipe(
  getCollectionFromFirestore,
  R.map(storeModelToCollection)
)

Defined in src/Firestore.ts:94

```
storeModelToFirestore :: Firestore -> Reader String (ReaderTaskEither Model Model Error)
```

###### Type declaration:

▸ (`firestore`: Firestore): *Reader‹string, ReaderTaskEither‹[Model](#model), Error, [Model](#model)››*

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore |

___

##### `Const` validateModel

• **validateModel**: *function* = ifElse(isModel, E.right, () =>
  E.left(new Error('Item is not a valid model.'))
)

Defined in src/Firestore.ts:177

```
validateModel :: a -> Either Model Error
```

###### Type declaration:

▸ (`a`: unknown): *E.Either‹Error, [Model](#model)›*

**Parameters:**

Name | Type |
------ | ------ |
`a` | unknown |

___

##### `Const` validateSnapshotExistence

• **validateSnapshotExistence**: *function* = ifElse(prop('exists'), E.right, () =>
  E.left(new Error('Item does not exist.'))
)

Defined in src/Firestore.ts:166

```
validateSnapshotExistence :: snapshot -> Either a Error
```

###### Type declaration:

▸ (`snapshot`: DocumentSnapshot): *E.Either‹Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | DocumentSnapshot |

#### Functions

##### `Const` clearEmulator

▸ **clearEmulator**(): *Promise‹void›*

Defined in src/Emulator.ts:30

```
clearFirebase :: () -> Promise
```

**Returns:** *Promise‹void›*

___

##### `Const` clearFirestore

▸ **clearFirestore**(): *Promise‹void›*

Defined in src/Emulator.ts:23

```
clearFirestore :: () -> Promise
```

**Returns:** *Promise‹void›*

___

##### `Const` fromTask

▸ **fromTask**(`task`: Task‹A›): *TaskEither‹Error, A›*

Defined in src/TaskEitherUtils.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`task` | Task‹A› |

**Returns:** *TaskEither‹Error, A›*

___

##### `Const` getCollectionFromFirestore

▸ **getCollectionFromFirestore**(`firestore`: Firestore‹›): *(Anonymous function)*

Defined in src/Firestore.ts:35

```
getCollectionFromFirestore :: Firestore -> Reader String Collection
```

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore‹› |

**Returns:** *(Anonymous function)*

___

##### `Const` getDataFromSnapshot

▸ **getDataFromSnapshot**(`snapshot`: DocumentSnapshot‹object›): *object*

Defined in src/Firestore.ts:157

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | DocumentSnapshot‹object› |

**Returns:** *object*

* \[ **field**: *string*\]: any

___

##### `Const` getDocumentFromCollection

▸ **getDocumentFromCollection**(`collection`: CollectionReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:46

```
getDocumentFromCollection :: Collection -> Reader Model Document
```

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference‹object› |

**Returns:** *(Anonymous function)*

___

##### `Const` getFirestore

▸ **getFirestore**(): *Firestore‹›*

Defined in src/Emulator.ts:16

```
getFirestore :: () -> Firestore
```

**Returns:** *Firestore‹›*

___

##### `Const` getSnapshotFromDocumentTask

▸ **getSnapshotFromDocumentTask**(`document`: DocumentReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:123

```
getSnapshotFromDocumentTask :: Document -> Task Snapshot
```

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference‹object› |

**Returns:** *(Anonymous function)*

___

##### `Const` id

▸ **id**(): *Arbitrary‹string›*

Defined in src/Arbitraries.ts:4

**Returns:** *Arbitrary‹string›*

___

##### `Const` isModel

▸ **isModel**(`a`: unknown): *a is Model*

Defined in src/Firestore.ts:25

```
isModel :: a -> bool
```

**Parameters:**

Name | Type |
------ | ------ |
`a` | unknown |

**Returns:** *a is Model*

___

##### `Const` listCollectionsInFirestore

▸ **listCollectionsInFirestore**(`firestore`: Firestore‹›): *(Anonymous function)*

Defined in src/Firestore.ts:227

```
listCollectionsInFirestore :: Firestore -> Task [Collection]
```

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore‹› |

**Returns:** *(Anonymous function)*

___

##### `Const` model

▸ **model**(): *Arbitrary‹[Model](#model)›*

Defined in src/Arbitraries.ts:21

**Returns:** *Arbitrary‹[Model](#model)›*

___

##### `Const` modelBase

▸ **modelBase**(): *Arbitrary‹[Model](#model)›*

Defined in src/Arbitraries.ts:9

**Returns:** *Arbitrary‹[Model](#model)›*

___

##### `Const` modelData

▸ **modelData**(): *Arbitrary‹object›*

Defined in src/Arbitraries.ts:14

**Returns:** *Arbitrary‹object›*

___

##### `Const` models

▸ **models**(): *Arbitrary‹Array‹[Model](#model)››*

Defined in src/Arbitraries.ts:26

**Returns:** *Arbitrary‹Array‹[Model](#model)››*

___

##### `Const` nonModelObject

▸ **nonModelObject**(): *Arbitrary‹unknown›*

Defined in src/Arbitraries.ts:6

**Returns:** *Arbitrary‹unknown›*

___

##### `Const` storeModelToDocumentTask

▸ **storeModelToDocumentTask**(`document`: DocumentReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:58

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference‹object› |

**Returns:** *(Anonymous function)*

___

##### `Const` storeModelToFirestoreWith

▸ **storeModelToFirestoreWith**<**A**>(`firestore`: any): *(Anonymous function)*

Defined in src/Firestore.ts:111

```
storeModelToFirestoreWith :: Firestore -> Reader String (ReaderTaskEither (() -> Model) Model Error)
```

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | any |

**Returns:** *(Anonymous function)*

___

##### `Const` table

▸ **table**(): *Arbitrary‹string›*

Defined in src/Arbitraries.ts:28

**Returns:** *Arbitrary‹string›*

## README

[functional-firestore](#readme) › [Globals](#globals)

### functional-firestore

### Globals

[functional-firestore](#globals)

#### functional-firestore

##### Index

###### Interfaces

* [Model](#model)

###### Variables

* [firestore](#const-firestore)
* [getModelFromCollection](#const-getmodelfromcollection)
* [getModelFromFirestore](#const-getmodelfromfirestore)
* [getModelFromSnapshot](#const-getmodelfromsnapshot)
* [getSnapshotFromCollection](#const-getsnapshotfromcollection)
* [getSnapshotFromDocument](#const-getsnapshotfromdocument)
* [storeModelToCollection](#const-storemodeltocollection)
* [storeModelToDocument](#const-storemodeltodocument)
* [storeModelToFirestore](#const-storemodeltofirestore)
* [validateModel](#const-validatemodel)
* [validateSnapshotExistence](#const-validatesnapshotexistence)

###### Functions

* [clearEmulator](#const-clearemulator)
* [clearFirestore](#const-clearfirestore)
* [fromTask](#const-fromtask)
* [getCollectionFromFirestore](#const-getcollectionfromfirestore)
* [getDataFromSnapshot](#const-getdatafromsnapshot)
* [getDocumentFromCollection](#const-getdocumentfromcollection)
* [getFirestore](#const-getfirestore)
* [getSnapshotFromDocumentTask](#const-getsnapshotfromdocumenttask)
* [id](#const-id)
* [isModel](#const-ismodel)
* [listCollectionsInFirestore](#const-listcollectionsinfirestore)
* [model](#const-model)
* [modelBase](#const-modelbase)
* [modelData](#const-modeldata)
* [models](#const-models)
* [nonModelObject](#const-nonmodelobject)
* [storeModelToDocumentTask](#const-storemodeltodocumenttask)
* [storeModelToFirestoreWith](#const-storemodeltofirestorewith)
* [table](#const-table)

##### Variables

###### `Const` firestore

• **firestore**: *Firestore‹›* = new Firestore({
  projectId: 'gcloud-project',
})

Defined in src/Emulator.ts:7

**`internal`** 

**`type`** {FirebaseFirestore.Firestore}

___

###### `Const` getModelFromCollection

• **getModelFromCollection**: *function* = pipe(
  getSnapshotFromCollection,
  RTE.chainEitherK(getModelFromSnapshot)
)

Defined in src/Firestore.ts:201

```
getModelFromCollection :: Collection -> ReaderTaskEither Model Model Error
```

####### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#model), Error, [Model](#model)›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

###### `Const` getModelFromFirestore

• **getModelFromFirestore**: *function* = pipe(
  getCollectionFromFirestore,
  R.map(getModelFromCollection)
)

Defined in src/Firestore.ts:213

```
getModelFromFirestore :: Firestore -> Reader String (ReaderTaskEither Model Model Error)
```

####### Type declaration:

▸ (`firestore`: Firestore): *Reader‹string, ReaderTaskEither‹[Model](#model), Error, [Model](#model)››*

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore |

___

###### `Const` getModelFromSnapshot

• **getModelFromSnapshot**: *function* = pipe(
  validateSnapshotExistence,
  E.map(getDataFromSnapshot),
  E.chain(validateModel)
)

Defined in src/Firestore.ts:188

```
getModelFromSnapshot :: Snapshot -> Either Model Error
```

####### Type declaration:

▸ (`snapshot`: DocumentSnapshot): *E.Either‹Error, [Model](#model)›*

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | DocumentSnapshot |

___

###### `Const` getSnapshotFromCollection

• **getSnapshotFromCollection**: *function* = pipe(
  getDocumentFromCollection,
  R.map(getSnapshotFromDocument)
)

Defined in src/Firestore.ts:144

**`internal`** 
```
getSnapshotFromCollection :: Collection -> ReaderTaskEither Model Snapshot Error
```

####### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#model), Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

###### `Const` getSnapshotFromDocument

• **getSnapshotFromDocument**: *function* = pipe(
  getSnapshotFromDocumentTask,
  TEUtils.fromTask
)

Defined in src/Firestore.ts:131

```
getSnapshotFromDocument :: Document -> TaskEither Snapshot Error
```

####### Type declaration:

▸ (`document`: DocumentReference): *TaskEither‹Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference |

___

###### `Const` storeModelToCollection

• **storeModelToCollection**: *function* = pipe(
  getDocumentFromCollection,
  R.chain(storeModelToDocument)
)

Defined in src/Firestore.ts:82

```
storeModelToCollection :: Collection -> String -> ReaderTaskEither Model Model Error
```

####### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#model), Error, [Model](#model)›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

###### `Const` storeModelToDocument

• **storeModelToDocument**: *function* = pipe(
  storeModelToDocumentTask,
  R.map(TEUtils.fromTask)
)

Defined in src/Firestore.ts:70

```
storeModelToDocument :: Document -> ReaderTaskEither Model Model Error
```

####### Type declaration:

▸ (`document`: DocumentReference): *ReaderTaskEither‹[Model](#model), Error, [Model](#model)›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference |

___

###### `Const` storeModelToFirestore

• **storeModelToFirestore**: *function* = pipe(
  getCollectionFromFirestore,
  R.map(storeModelToCollection)
)

Defined in src/Firestore.ts:94

```
storeModelToFirestore :: Firestore -> Reader String (ReaderTaskEither Model Model Error)
```

####### Type declaration:

▸ (`firestore`: Firestore): *Reader‹string, ReaderTaskEither‹[Model](#model), Error, [Model](#model)››*

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore |

___

###### `Const` validateModel

• **validateModel**: *function* = ifElse(isModel, E.right, () =>
  E.left(new Error('Item is not a valid model.'))
)

Defined in src/Firestore.ts:177

```
validateModel :: a -> Either Model Error
```

####### Type declaration:

▸ (`a`: unknown): *E.Either‹Error, [Model](#model)›*

**Parameters:**

Name | Type |
------ | ------ |
`a` | unknown |

___

###### `Const` validateSnapshotExistence

• **validateSnapshotExistence**: *function* = ifElse(prop('exists'), E.right, () =>
  E.left(new Error('Item does not exist.'))
)

Defined in src/Firestore.ts:166

```
validateSnapshotExistence :: snapshot -> Either a Error
```

####### Type declaration:

▸ (`snapshot`: DocumentSnapshot): *E.Either‹Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | DocumentSnapshot |

##### Functions

###### `Const` clearEmulator

▸ **clearEmulator**(): *Promise‹void›*

Defined in src/Emulator.ts:30

```
clearFirebase :: () -> Promise
```

**Returns:** *Promise‹void›*

___

###### `Const` clearFirestore

▸ **clearFirestore**(): *Promise‹void›*

Defined in src/Emulator.ts:23

```
clearFirestore :: () -> Promise
```

**Returns:** *Promise‹void›*

___

###### `Const` fromTask

▸ **fromTask**(`task`: Task‹A›): *TaskEither‹Error, A›*

Defined in src/TaskEitherUtils.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`task` | Task‹A› |

**Returns:** *TaskEither‹Error, A›*

___

###### `Const` getCollectionFromFirestore

▸ **getCollectionFromFirestore**(`firestore`: Firestore‹›): *(Anonymous function)*

Defined in src/Firestore.ts:35

```
getCollectionFromFirestore :: Firestore -> Reader String Collection
```

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore‹› |

**Returns:** *(Anonymous function)*

___

###### `Const` getDataFromSnapshot

▸ **getDataFromSnapshot**(`snapshot`: DocumentSnapshot‹object›): *object*

Defined in src/Firestore.ts:157

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | DocumentSnapshot‹object› |

**Returns:** *object*

* \[ **field**: *string*\]: any

___

###### `Const` getDocumentFromCollection

▸ **getDocumentFromCollection**(`collection`: CollectionReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:46

```
getDocumentFromCollection :: Collection -> Reader Model Document
```

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference‹object› |

**Returns:** *(Anonymous function)*

___

###### `Const` getFirestore

▸ **getFirestore**(): *Firestore‹›*

Defined in src/Emulator.ts:16

```
getFirestore :: () -> Firestore
```

**Returns:** *Firestore‹›*

___

###### `Const` getSnapshotFromDocumentTask

▸ **getSnapshotFromDocumentTask**(`document`: DocumentReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:123

```
getSnapshotFromDocumentTask :: Document -> Task Snapshot
```

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference‹object› |

**Returns:** *(Anonymous function)*

___

###### `Const` id

▸ **id**(): *Arbitrary‹string›*

Defined in src/Arbitraries.ts:4

**Returns:** *Arbitrary‹string›*

___

###### `Const` isModel

▸ **isModel**(`a`: unknown): *a is Model*

Defined in src/Firestore.ts:25

```
isModel :: a -> bool
```

**Parameters:**

Name | Type |
------ | ------ |
`a` | unknown |

**Returns:** *a is Model*

___

###### `Const` listCollectionsInFirestore

▸ **listCollectionsInFirestore**(`firestore`: Firestore‹›): *(Anonymous function)*

Defined in src/Firestore.ts:227

```
listCollectionsInFirestore :: Firestore -> Task [Collection]
```

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore‹› |

**Returns:** *(Anonymous function)*

___

###### `Const` model

▸ **model**(): *Arbitrary‹[Model](#model)›*

Defined in src/Arbitraries.ts:21

**Returns:** *Arbitrary‹[Model](#model)›*

___

###### `Const` modelBase

▸ **modelBase**(): *Arbitrary‹[Model](#model)›*

Defined in src/Arbitraries.ts:9

**Returns:** *Arbitrary‹[Model](#model)›*

___

###### `Const` modelData

▸ **modelData**(): *Arbitrary‹object›*

Defined in src/Arbitraries.ts:14

**Returns:** *Arbitrary‹object›*

___

###### `Const` models

▸ **models**(): *Arbitrary‹Array‹[Model](#model)››*

Defined in src/Arbitraries.ts:26

**Returns:** *Arbitrary‹Array‹[Model](#model)››*

___

###### `Const` nonModelObject

▸ **nonModelObject**(): *Arbitrary‹unknown›*

Defined in src/Arbitraries.ts:6

**Returns:** *Arbitrary‹unknown›*

___

###### `Const` storeModelToDocumentTask

▸ **storeModelToDocumentTask**(`document`: DocumentReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:58

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference‹object› |

**Returns:** *(Anonymous function)*

___

###### `Const` storeModelToFirestoreWith

▸ **storeModelToFirestoreWith**<**A**>(`firestore`: any): *(Anonymous function)*

Defined in src/Firestore.ts:111

```
storeModelToFirestoreWith :: Firestore -> Reader String (ReaderTaskEither (() -> Model) Model Error)
```

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | any |

**Returns:** *(Anonymous function)*

___

###### `Const` table

▸ **table**(): *Arbitrary‹string›*

Defined in src/Arbitraries.ts:28

**Returns:** *Arbitrary‹string›*

### README

[functional-firestore](#globals)

#### functional-firestore

### Model

[functional-firestore](#globals) › [Model](#model)

#### Interface: Model

##### Hierarchy

* **Model**

##### Index

###### Properties

* [id](#id)

##### Properties

######  id

• **id**: *string*

Defined in src/Firestore.ts:17

## Model

[functional-firestore](#readme) › [Globals](#globals) › [Model](#model)

### Interface: Model

#### Hierarchy

* **Model**

#### Index

##### Properties

* [id](#id)

#### Properties

#####  id

• **id**: *string*

Defined in src/Firestore.ts:17

# Interfaces

## Firestore Model

[functional-firestore](#readme) › [Globals](#globals) › ["Firestore"](#firestore) › [Model](#firestore-model)

### Interface: Model

#### Hierarchy

* **Model**

#### Index

##### Properties

* [id](#id)

#### Properties

#####  id

• **id**: *string*

Defined in src/Firestore.ts:17

# Modules

## Arbitraries

[functional-firestore](#readme) › [Globals](#globals) › ["Arbitraries"](#arbitraries)

### External module: "Arbitraries"

#### Index

##### Functions

* [id](#const-id)
* [model](#const-model)
* [modelBase](#const-modelbase)
* [modelData](#const-modeldata)
* [models](#const-models)
* [nonModelObject](#const-nonmodelobject)
* [table](#const-table)

#### Functions

##### `Const` id

▸ **id**(): *Arbitrary‹string›*

Defined in src/Arbitraries.ts:4

**Returns:** *Arbitrary‹string›*

___

##### `Const` model

▸ **model**(): *Arbitrary‹[Model](#firestore-model)›*

Defined in src/Arbitraries.ts:21

**Returns:** *Arbitrary‹[Model](#firestore-model)›*

___

##### `Const` modelBase

▸ **modelBase**(): *Arbitrary‹[Model](#firestore-model)›*

Defined in src/Arbitraries.ts:9

**Returns:** *Arbitrary‹[Model](#firestore-model)›*

___

##### `Const` modelData

▸ **modelData**(): *Arbitrary‹object›*

Defined in src/Arbitraries.ts:14

**Returns:** *Arbitrary‹object›*

___

##### `Const` models

▸ **models**(): *Arbitrary‹Array‹[Model](#firestore-model)››*

Defined in src/Arbitraries.ts:26

**Returns:** *Arbitrary‹Array‹[Model](#firestore-model)››*

___

##### `Const` nonModelObject

▸ **nonModelObject**(): *Arbitrary‹unknown›*

Defined in src/Arbitraries.ts:6

**Returns:** *Arbitrary‹unknown›*

___

##### `Const` table

▸ **table**(): *Arbitrary‹string›*

Defined in src/Arbitraries.ts:28

**Returns:** *Arbitrary‹string›*

## Emulator

[functional-firestore](#readme) › [Globals](#globals) › ["Emulator"](#emulator)

### External module: "Emulator"

#### Index

##### Functions

* [clearEmulator](#const-clearemulator)
* [clearFirestore](#const-clearfirestore)
* [getFirestore](#const-getfirestore)

#### Functions

##### `Const` clearEmulator

▸ **clearEmulator**(): *Promise‹void›*

Defined in src/Emulator.ts:30

```
clearFirebase :: () -> Promise
```

**Returns:** *Promise‹void›*

___

##### `Const` clearFirestore

▸ **clearFirestore**(): *Promise‹void›*

Defined in src/Emulator.ts:23

```
clearFirestore :: () -> Promise
```

**Returns:** *Promise‹void›*

___

##### `Const` getFirestore

▸ **getFirestore**(): *Firestore‹›*

Defined in src/Emulator.ts:16

```
getFirestore :: () -> Firestore
```

**Returns:** *Firestore‹›*

## Firestore

[functional-firestore](#readme) › [Globals](#globals) › ["Firestore"](#firestore)

### External module: "Firestore"

#### Index

##### Interfaces

* [Model](#firestore-model)

##### Variables

* [getModelFromCollection](#const-getmodelfromcollection)
* [getModelFromFirestore](#const-getmodelfromfirestore)
* [getSnapshotFromDocument](#const-getsnapshotfromdocument)
* [storeModelToCollection](#const-storemodeltocollection)
* [storeModelToDocument](#const-storemodeltodocument)
* [storeModelToFirestore](#const-storemodeltofirestore)
* [validateModel](#const-validatemodel)
* [validateSnapshotExistence](#const-validatesnapshotexistence)

##### Functions

* [getCollectionFromFirestore](#const-getcollectionfromfirestore)
* [getDocumentFromCollection](#const-getdocumentfromcollection)
* [getSnapshotFromDocumentTask](#const-getsnapshotfromdocumenttask)
* [isModel](#const-ismodel)
* [listCollectionsInFirestore](#const-listcollectionsinfirestore)
* [storeModelToFirestoreWith](#const-storemodeltofirestorewith)

#### Variables

##### `Const` getModelFromCollection

• **getModelFromCollection**: *function* = pipe(
  getSnapshotFromCollection,
  RTE.chainEitherK(getModelFromSnapshot)
)

Defined in src/Firestore.ts:201

```
getModelFromCollection :: Collection -> ReaderTaskEither Model Model Error
```

###### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#firestore-model), Error, [Model](#firestore-model)›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

##### `Const` getModelFromFirestore

• **getModelFromFirestore**: *function* = pipe(
  getCollectionFromFirestore,
  R.map(getModelFromCollection)
)

Defined in src/Firestore.ts:213

```
getModelFromFirestore :: Firestore -> Reader String (ReaderTaskEither Model Model Error)
```

###### Type declaration:

▸ (`firestore`: Firestore): *Reader‹string, ReaderTaskEither‹[Model](#firestore-model), Error, [Model](#firestore-model)››*

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore |

___

##### `Const` getSnapshotFromDocument

• **getSnapshotFromDocument**: *function* = pipe(
  getSnapshotFromDocumentTask,
  TEUtils.fromTask
)

Defined in src/Firestore.ts:131

```
getSnapshotFromDocument :: Document -> TaskEither Snapshot Error
```

###### Type declaration:

▸ (`document`: DocumentReference): *TaskEither‹Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference |

___

##### `Const` storeModelToCollection

• **storeModelToCollection**: *function* = pipe(
  getDocumentFromCollection,
  R.chain(storeModelToDocument)
)

Defined in src/Firestore.ts:82

```
storeModelToCollection :: Collection -> String -> ReaderTaskEither Model Model Error
```

###### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#firestore-model), Error, [Model](#firestore-model)›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

##### `Const` storeModelToDocument

• **storeModelToDocument**: *function* = pipe(
  storeModelToDocumentTask,
  R.map(TEUtils.fromTask)
)

Defined in src/Firestore.ts:70

```
storeModelToDocument :: Document -> ReaderTaskEither Model Model Error
```

###### Type declaration:

▸ (`document`: DocumentReference): *ReaderTaskEither‹[Model](#firestore-model), Error, [Model](#firestore-model)›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference |

___

##### `Const` storeModelToFirestore

• **storeModelToFirestore**: *function* = pipe(
  getCollectionFromFirestore,
  R.map(storeModelToCollection)
)

Defined in src/Firestore.ts:94

```
storeModelToFirestore :: Firestore -> Reader String (ReaderTaskEither Model Model Error)
```

###### Type declaration:

▸ (`firestore`: Firestore): *Reader‹string, ReaderTaskEither‹[Model](#firestore-model), Error, [Model](#firestore-model)››*

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore |

___

##### `Const` validateModel

• **validateModel**: *function* = ifElse(isModel, E.right, () =>
  E.left(new Error('Item is not a valid model.'))
)

Defined in src/Firestore.ts:177

```
validateModel :: a -> Either Model Error
```

###### Type declaration:

▸ (`a`: unknown): *E.Either‹Error, [Model](#firestore-model)›*

**Parameters:**

Name | Type |
------ | ------ |
`a` | unknown |

___

##### `Const` validateSnapshotExistence

• **validateSnapshotExistence**: *function* = ifElse(prop('exists'), E.right, () =>
  E.left(new Error('Item does not exist.'))
)

Defined in src/Firestore.ts:166

```
validateSnapshotExistence :: snapshot -> Either a Error
```

###### Type declaration:

▸ (`snapshot`: DocumentSnapshot): *E.Either‹Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | DocumentSnapshot |

#### Functions

##### `Const` getCollectionFromFirestore

▸ **getCollectionFromFirestore**(`firestore`: Firestore‹›): *(Anonymous function)*

Defined in src/Firestore.ts:35

```
getCollectionFromFirestore :: Firestore -> Reader String Collection
```

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore‹› |

**Returns:** *(Anonymous function)*

___

##### `Const` getDocumentFromCollection

▸ **getDocumentFromCollection**(`collection`: CollectionReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:46

```
getDocumentFromCollection :: Collection -> Reader Model Document
```

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference‹object› |

**Returns:** *(Anonymous function)*

___

##### `Const` getSnapshotFromDocumentTask

▸ **getSnapshotFromDocumentTask**(`document`: DocumentReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:123

```
getSnapshotFromDocumentTask :: Document -> Task Snapshot
```

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference‹object› |

**Returns:** *(Anonymous function)*

___

##### `Const` isModel

▸ **isModel**(`a`: unknown): *a is Model*

Defined in src/Firestore.ts:25

```
isModel :: a -> bool
```

**Parameters:**

Name | Type |
------ | ------ |
`a` | unknown |

**Returns:** *a is Model*

___

##### `Const` listCollectionsInFirestore

▸ **listCollectionsInFirestore**(`firestore`: Firestore‹›): *(Anonymous function)*

Defined in src/Firestore.ts:227

```
listCollectionsInFirestore :: Firestore -> Task [Collection]
```

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore‹› |

**Returns:** *(Anonymous function)*

___

##### `Const` storeModelToFirestoreWith

▸ **storeModelToFirestoreWith**<**A**>(`firestore`: any): *(Anonymous function)*

Defined in src/Firestore.ts:111

```
storeModelToFirestoreWith :: Firestore -> Reader String (ReaderTaskEither (() -> Model) Model Error)
```

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | any |

**Returns:** *(Anonymous function)*

## Index

[functional-firestore](#readme) › [Globals](#globals) › ["index"](#index)

### External module: "index"

#### Index

##### References

* [Model](#model)
* [getCollectionFromFirestore](#getcollectionfromfirestore)
* [getDocumentFromCollection](#getdocumentfromcollection)
* [getModelFromCollection](#getmodelfromcollection)
* [getModelFromFirestore](#getmodelfromfirestore)
* [getSnapshotFromDocument](#getsnapshotfromdocument)
* [getSnapshotFromDocumentTask](#getsnapshotfromdocumenttask)
* [isModel](#ismodel)
* [listCollectionsInFirestore](#listcollectionsinfirestore)
* [storeModelToCollection](#storemodeltocollection)
* [storeModelToDocument](#storemodeltodocument)
* [storeModelToFirestore](#storemodeltofirestore)
* [storeModelToFirestoreWith](#storemodeltofirestorewith)
* [validateModel](#validatemodel)
* [validateSnapshotExistence](#validatesnapshotexistence)

#### References

#####  Model

• **Model**:

___

#####  getCollectionFromFirestore

• **getCollectionFromFirestore**:

___

#####  getDocumentFromCollection

• **getDocumentFromCollection**:

___

#####  getModelFromCollection

• **getModelFromCollection**:

___

#####  getModelFromFirestore

• **getModelFromFirestore**:

___

#####  getSnapshotFromDocument

• **getSnapshotFromDocument**:

___

#####  getSnapshotFromDocumentTask

• **getSnapshotFromDocumentTask**:

___

#####  isModel

• **isModel**:

___

#####  listCollectionsInFirestore

• **listCollectionsInFirestore**:

___

#####  storeModelToCollection

• **storeModelToCollection**:

___

#####  storeModelToDocument

• **storeModelToDocument**:

___

#####  storeModelToFirestore

• **storeModelToFirestore**:

___

#####  storeModelToFirestoreWith

• **storeModelToFirestoreWith**:

___

#####  validateModel

• **validateModel**:

___

#####  validateSnapshotExistence

• **validateSnapshotExistence**:

## Taskeitherutils

[functional-firestore](#readme) › [Globals](#globals) › ["TaskEitherUtils"](#taskeitherutils)

### External module: "TaskEitherUtils"

#### Index

##### Functions

* [fromTask](#const-fromtask)

#### Functions

##### `Const` fromTask

▸ **fromTask**(`task`: Task‹A›): *TaskEither‹Error, A›*

Defined in src/TaskEitherUtils.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`task` | Task‹A› |

**Returns:** *TaskEither‹Error, A›*

# Interfaces


<a name="interfaces_firestore_modelmd"></a>

[functional-firestore](#readmemd) › [Globals](#globalsmd) › ["Firestore"](#modules_firestore_md) › [Model](#interfaces_firestore_modelmd)

## Interface: Model

### Hierarchy

* **Model**

### Index

#### Properties

* [id](#id)

### Properties

####  id

• **id**: *string*

Defined in src/Firestore.ts:17

# Modules


<a name="modules_arbitraries_md"></a>

[functional-firestore](#readmemd) › [Globals](#globalsmd) › ["Arbitraries"](#modules_arbitraries_md)

## External module: "Arbitraries"

### Index

#### Functions

* [id](#const-id)
* [model](#const-model)
* [modelBase](#const-modelbase)
* [modelData](#const-modeldata)
* [models](#const-models)
* [nonModelObject](#const-nonmodelobject)
* [table](#const-table)

### Functions

#### `Const` id

▸ **id**(): *Arbitrary‹string›*

Defined in src/Arbitraries.ts:4

**Returns:** *Arbitrary‹string›*

___

#### `Const` model

▸ **model**(): *Arbitrary‹[Model](#interfaces_firestore_modelmd)›*

Defined in src/Arbitraries.ts:21

**Returns:** *Arbitrary‹[Model](#interfaces_firestore_modelmd)›*

___

#### `Const` modelBase

▸ **modelBase**(): *Arbitrary‹[Model](#interfaces_firestore_modelmd)›*

Defined in src/Arbitraries.ts:9

**Returns:** *Arbitrary‹[Model](#interfaces_firestore_modelmd)›*

___

#### `Const` modelData

▸ **modelData**(): *Arbitrary‹object›*

Defined in src/Arbitraries.ts:14

**Returns:** *Arbitrary‹object›*

___

#### `Const` models

▸ **models**(): *Arbitrary‹Array‹[Model](#interfaces_firestore_modelmd)››*

Defined in src/Arbitraries.ts:26

**Returns:** *Arbitrary‹Array‹[Model](#interfaces_firestore_modelmd)››*

___

#### `Const` nonModelObject

▸ **nonModelObject**(): *Arbitrary‹unknown›*

Defined in src/Arbitraries.ts:6

**Returns:** *Arbitrary‹unknown›*

___

#### `Const` table

▸ **table**(): *Arbitrary‹string›*

Defined in src/Arbitraries.ts:28

**Returns:** *Arbitrary‹string›*


<a name="modules_emulator_md"></a>

[functional-firestore](#readmemd) › [Globals](#globalsmd) › ["Emulator"](#modules_emulator_md)

## External module: "Emulator"

### Index

#### Functions

* [clearEmulator](#const-clearemulator)
* [clearFirestore](#const-clearfirestore)
* [getFirestore](#const-getfirestore)

### Functions

#### `Const` clearEmulator

▸ **clearEmulator**(): *Promise‹void›*

Defined in src/Emulator.ts:30

```
clearFirebase :: () -> Promise
```

**Returns:** *Promise‹void›*

___

#### `Const` clearFirestore

▸ **clearFirestore**(): *Promise‹void›*

Defined in src/Emulator.ts:23

```
clearFirestore :: () -> Promise
```

**Returns:** *Promise‹void›*

___

#### `Const` getFirestore

▸ **getFirestore**(): *Firestore‹›*

Defined in src/Emulator.ts:16

```
getFirestore :: () -> Firestore
```

**Returns:** *Firestore‹›*


<a name="modules_firestore_md"></a>

[functional-firestore](#readmemd) › [Globals](#globalsmd) › ["Firestore"](#modules_firestore_md)

## External module: "Firestore"

### Index

#### Interfaces

* [Model](#interfaces_firestore_modelmd)

#### Variables

* [getModelFromCollection](#const-getmodelfromcollection)
* [getModelFromFirestore](#const-getmodelfromfirestore)
* [getSnapshotFromDocument](#const-getsnapshotfromdocument)
* [storeModelToCollection](#const-storemodeltocollection)
* [storeModelToDocument](#const-storemodeltodocument)
* [storeModelToFirestore](#const-storemodeltofirestore)
* [validateModel](#const-validatemodel)
* [validateSnapshotExistence](#const-validatesnapshotexistence)

#### Functions

* [getCollectionFromFirestore](#const-getcollectionfromfirestore)
* [getDocumentFromCollection](#const-getdocumentfromcollection)
* [getSnapshotFromDocumentTask](#const-getsnapshotfromdocumenttask)
* [isModel](#const-ismodel)
* [listCollectionsInFirestore](#const-listcollectionsinfirestore)
* [storeModelToFirestoreWith](#const-storemodeltofirestorewith)

### Variables

#### `Const` getModelFromCollection

• **getModelFromCollection**: *function* = pipe(
  getSnapshotFromCollection,
  RTE.chainEitherK(getModelFromSnapshot)
)

Defined in src/Firestore.ts:201

```
getModelFromCollection :: Collection -> ReaderTaskEither Model Model Error
```

##### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#interfaces_firestore_modelmd), Error, [Model](#interfaces_firestore_modelmd)›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

#### `Const` getModelFromFirestore

• **getModelFromFirestore**: *function* = pipe(
  getCollectionFromFirestore,
  R.map(getModelFromCollection)
)

Defined in src/Firestore.ts:213

```
getModelFromFirestore :: Firestore -> Reader String (ReaderTaskEither Model Model Error)
```

##### Type declaration:

▸ (`firestore`: Firestore): *Reader‹string, ReaderTaskEither‹[Model](#interfaces_firestore_modelmd), Error, [Model](#interfaces_firestore_modelmd)››*

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore |

___

#### `Const` getSnapshotFromDocument

• **getSnapshotFromDocument**: *function* = pipe(
  getSnapshotFromDocumentTask,
  TEUtils.fromTask
)

Defined in src/Firestore.ts:131

```
getSnapshotFromDocument :: Document -> TaskEither Snapshot Error
```

##### Type declaration:

▸ (`document`: DocumentReference): *TaskEither‹Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference |

___

#### `Const` storeModelToCollection

• **storeModelToCollection**: *function* = pipe(
  getDocumentFromCollection,
  R.chain(storeModelToDocument)
)

Defined in src/Firestore.ts:82

```
storeModelToCollection :: Collection -> String -> ReaderTaskEither Model Model Error
```

##### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#interfaces_firestore_modelmd), Error, [Model](#interfaces_firestore_modelmd)›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

#### `Const` storeModelToDocument

• **storeModelToDocument**: *function* = pipe(
  storeModelToDocumentTask,
  R.map(TEUtils.fromTask)
)

Defined in src/Firestore.ts:70

```
storeModelToDocument :: Document -> ReaderTaskEither Model Model Error
```

##### Type declaration:

▸ (`document`: DocumentReference): *ReaderTaskEither‹[Model](#interfaces_firestore_modelmd), Error, [Model](#interfaces_firestore_modelmd)›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference |

___

#### `Const` storeModelToFirestore

• **storeModelToFirestore**: *function* = pipe(
  getCollectionFromFirestore,
  R.map(storeModelToCollection)
)

Defined in src/Firestore.ts:94

```
storeModelToFirestore :: Firestore -> Reader String (ReaderTaskEither Model Model Error)
```

##### Type declaration:

▸ (`firestore`: Firestore): *Reader‹string, ReaderTaskEither‹[Model](#interfaces_firestore_modelmd), Error, [Model](#interfaces_firestore_modelmd)››*

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore |

___

#### `Const` validateModel

• **validateModel**: *function* = ifElse(isModel, E.right, () =>
  E.left(new Error('Item is not a valid model.'))
)

Defined in src/Firestore.ts:177

```
validateModel :: a -> Either Model Error
```

##### Type declaration:

▸ (`a`: unknown): *E.Either‹Error, [Model](#interfaces_firestore_modelmd)›*

**Parameters:**

Name | Type |
------ | ------ |
`a` | unknown |

___

#### `Const` validateSnapshotExistence

• **validateSnapshotExistence**: *function* = ifElse(prop('exists'), E.right, () =>
  E.left(new Error('Item does not exist.'))
)

Defined in src/Firestore.ts:166

```
validateSnapshotExistence :: snapshot -> Either a Error
```

##### Type declaration:

▸ (`snapshot`: DocumentSnapshot): *E.Either‹Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | DocumentSnapshot |

### Functions

#### `Const` getCollectionFromFirestore

▸ **getCollectionFromFirestore**(`firestore`: Firestore‹›): *(Anonymous function)*

Defined in src/Firestore.ts:35

```
getCollectionFromFirestore :: Firestore -> Reader String Collection
```

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore‹› |

**Returns:** *(Anonymous function)*

___

#### `Const` getDocumentFromCollection

▸ **getDocumentFromCollection**(`collection`: CollectionReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:46

```
getDocumentFromCollection :: Collection -> Reader Model Document
```

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference‹object› |

**Returns:** *(Anonymous function)*

___

#### `Const` getSnapshotFromDocumentTask

▸ **getSnapshotFromDocumentTask**(`document`: DocumentReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:123

```
getSnapshotFromDocumentTask :: Document -> Task Snapshot
```

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference‹object› |

**Returns:** *(Anonymous function)*

___

#### `Const` isModel

▸ **isModel**(`a`: unknown): *a is Model*

Defined in src/Firestore.ts:25

```
isModel :: a -> bool
```

**Parameters:**

Name | Type |
------ | ------ |
`a` | unknown |

**Returns:** *a is Model*

___

#### `Const` listCollectionsInFirestore

▸ **listCollectionsInFirestore**(`firestore`: Firestore‹›): *(Anonymous function)*

Defined in src/Firestore.ts:227

```
listCollectionsInFirestore :: Firestore -> Task [Collection]
```

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore‹› |

**Returns:** *(Anonymous function)*

___

#### `Const` storeModelToFirestoreWith

▸ **storeModelToFirestoreWith**<**A**>(`firestore`: any): *(Anonymous function)*

Defined in src/Firestore.ts:111

```
storeModelToFirestoreWith :: Firestore -> Reader String (ReaderTaskEither (() -> Model) Model Error)
```

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | any |

**Returns:** *(Anonymous function)*


<a name="modules_index_md"></a>

[functional-firestore](#readmemd) › [Globals](#globalsmd) › ["index"](#modules_index_md)

## External module: "index"

### Index

#### References

* [Model](#model)
* [getCollectionFromFirestore](#getcollectionfromfirestore)
* [getDocumentFromCollection](#getdocumentfromcollection)
* [getModelFromCollection](#getmodelfromcollection)
* [getModelFromFirestore](#getmodelfromfirestore)
* [getSnapshotFromDocument](#getsnapshotfromdocument)
* [getSnapshotFromDocumentTask](#getsnapshotfromdocumenttask)
* [isModel](#ismodel)
* [listCollectionsInFirestore](#listcollectionsinfirestore)
* [storeModelToCollection](#storemodeltocollection)
* [storeModelToDocument](#storemodeltodocument)
* [storeModelToFirestore](#storemodeltofirestore)
* [storeModelToFirestoreWith](#storemodeltofirestorewith)
* [validateModel](#validatemodel)
* [validateSnapshotExistence](#validatesnapshotexistence)

### References

####  Model

• **Model**:

___

####  getCollectionFromFirestore

• **getCollectionFromFirestore**:

___

####  getDocumentFromCollection

• **getDocumentFromCollection**:

___

####  getModelFromCollection

• **getModelFromCollection**:

___

####  getModelFromFirestore

• **getModelFromFirestore**:

___

####  getSnapshotFromDocument

• **getSnapshotFromDocument**:

___

####  getSnapshotFromDocumentTask

• **getSnapshotFromDocumentTask**:

___

####  isModel

• **isModel**:

___

####  listCollectionsInFirestore

• **listCollectionsInFirestore**:

___

####  storeModelToCollection

• **storeModelToCollection**:

___

####  storeModelToDocument

• **storeModelToDocument**:

___

####  storeModelToFirestore

• **storeModelToFirestore**:

___

####  storeModelToFirestoreWith

• **storeModelToFirestoreWith**:

___

####  validateModel

• **validateModel**:

___

####  validateSnapshotExistence

• **validateSnapshotExistence**:


<a name="modules_taskeitherutils_md"></a>

[functional-firestore](#readmemd) › [Globals](#globalsmd) › ["TaskEitherUtils"](#modules_taskeitherutils_md)

## External module: "TaskEitherUtils"

### Index

#### Functions

* [fromTask](#const-fromtask)

### Functions

#### `Const` fromTask

▸ **fromTask**(`task`: Task‹A›): *TaskEither‹Error, A›*

Defined in src/TaskEitherUtils.ts:11

**Parameters:**

Name | Type |
------ | ------ |
`task` | Task‹A› |

**Returns:** *TaskEither‹Error, A›*
