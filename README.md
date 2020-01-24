
<a name="globalsmd"></a>

[functional-firestore](#globalsmd)

# functional-firestore

## Index

### External modules

* ["Arbitraries"](#modules_arbitraries_md)
* ["Emulator"](#modules_emulator_md)
* ["Firestore"](#modules_firestore_md)
* ["TaskEitherUtils"](#modules_taskeitherutils_md)
* ["index"](#modules_index_md)


<a name="readmemd"></a>

[functional-firestore](#globalsmd)

# functional-firestore


# Interfaces


<a name="interfaces_firestore_modelmd"></a>

[functional-firestore](#globalsmd) › ["Firestore"](#modules_firestore_md) › [Model](#interfaces_firestore_modelmd)

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

[functional-firestore](#globalsmd) › ["Arbitraries"](#modules_arbitraries_md)

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

[functional-firestore](#globalsmd) › ["Emulator"](#modules_emulator_md)

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

```haskell
clearFirebase :: () -> Promise
```

**Returns:** *Promise‹void›*

___

#### `Const` clearFirestore

▸ **clearFirestore**(): *Promise‹void›*

Defined in src/Emulator.ts:23

```haskell
clearFirestore :: () -> Promise
```

**Returns:** *Promise‹void›*

___

#### `Const` getFirestore

▸ **getFirestore**(): *Firestore‹›*

Defined in src/Emulator.ts:16

```haskell
getFirestore :: () -> Firestore
```

**Returns:** *Firestore‹›*


<a name="modules_firestore_md"></a>

[functional-firestore](#globalsmd) › ["Firestore"](#modules_firestore_md)

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

```haskell
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

```haskell
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

```haskell
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

```haskell
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

```haskell
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

```haskell
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

```haskell
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

```haskell
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

```haskell
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

```haskell
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

```haskell
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

```haskell
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

```haskell
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

```haskell
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

[functional-firestore](#globalsmd) › ["index"](#modules_index_md)

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

[functional-firestore](#globalsmd) › ["TaskEitherUtils"](#modules_taskeitherutils_md)

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
