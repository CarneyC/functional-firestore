<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [functional-firestore](#functional-firestore)
  - [Index](#index)
    - [Interfaces](#interfaces)
    - [Variables](#variables)
    - [Functions](#functions)
  - [Variables](#variables-1)
    - [`Const` firestore](#const-firestore)
    - [`Const` getModelFromCollection](#const-getmodelfromcollection)
    - [`Const` getModelFromFirestore](#const-getmodelfromfirestore)
    - [`Const` getModelFromSnapshot](#const-getmodelfromsnapshot)
    - [`Const` getSnapshotFromCollection](#const-getsnapshotfromcollection)
    - [`Const` getSnapshotFromDocument](#const-getsnapshotfromdocument)
    - [`Const` storeModelToCollection](#const-storemodeltocollection)
    - [`Const` storeModelToDocument](#const-storemodeltodocument)
    - [`Const` storeModelToFirestore](#const-storemodeltofirestore)
    - [`Const` validateModel](#const-validatemodel)
    - [`Const` validateSnapshotExistence](#const-validatesnapshotexistence)
  - [Functions](#functions-1)
    - [`Const` clearEmulator](#const-clearemulator)
    - [`Const` clearFirestore](#const-clearfirestore)
    - [`Const` fromTask](#const-fromtask)
    - [`Const` getCollectionFromFirestore](#const-getcollectionfromfirestore)
    - [`Const` getDataFromSnapshot](#const-getdatafromsnapshot)
    - [`Const` getDocumentFromCollection](#const-getdocumentfromcollection)
    - [`Const` getFirestore](#const-getfirestore)
    - [`Const` getSnapshotFromDocumentTask](#const-getsnapshotfromdocumenttask)
    - [`Const` id](#const-id)
    - [`Const` isModel](#const-ismodel)
    - [`Const` listCollectionsInFirestore](#const-listcollectionsinfirestore)
    - [`Const` model](#const-model)
    - [`Const` modelBase](#const-modelbase)
    - [`Const` modelData](#const-modeldata)
    - [`Const` models](#const-models)
    - [`Const` nonModelObject](#const-nonmodelobject)
    - [`Const` storeModelToDocumentTask](#const-storemodeltodocumenttask)
    - [`Const` storeModelToFirestoreWith](#const-storemodeltofirestorewith)
    - [`Const` table](#const-table)
- [functional-firestore](#functional-firestore-1)
- [Interfaces](#interfaces-1)
  - [Interface: Model](#interface-model)
    - [Hierarchy](#hierarchy)
    - [Index](#index-1)
    - [Properties](#properties)
  - [Interface: Table](#interface-table)
    - [Hierarchy](#hierarchy-1)
    - [Index](#index-2)
    - [Properties](#properties-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


<a name="globalsmd"></a>

[functional-firestore](#globalsmd)

# functional-firestore

## Index

### Interfaces

* [Model](#interfacesmodelmd)
* [Table](#interfacestablemd)

### Variables

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

### Functions

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

## Variables

### `Const` firestore

• **firestore**: *Firestore‹›* = new Firestore({
  projectId: 'gcloud-project',
})

Defined in src/Emulator.ts:3

___

### `Const` getModelFromCollection

• **getModelFromCollection**: *function* = pipe(
  getSnapshotFromCollection,
  RTE.chainEitherK(getModelFromSnapshot)
)

Defined in src/Firestore.ts:202

```haskell
getModelFromCollection :: Collection -> ReaderTaskEither Model Model Error
```

#### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#interfacesmodelmd), Error, [Model](#interfacesmodelmd)›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

### `Const` getModelFromFirestore

• **getModelFromFirestore**: *function* = pipe(
  getCollectionFromFirestore,
  R.map(getModelFromCollection)
)

Defined in src/Firestore.ts:214

```haskell
getModelFromFirestore :: Firestore -> Reader Table (ReaderTaskEither Model Model Error)
```

#### Type declaration:

▸ (`firestore`: Firestore): *Reader‹[Table](#interfacestablemd), ReaderTaskEither‹[Model](#interfacesmodelmd), Error, [Model](#interfacesmodelmd)››*

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore |

___

### `Const` getModelFromSnapshot

• **getModelFromSnapshot**: *function* = pipe(
  validateSnapshotExistence,
  E.map(getDataFromSnapshot),
  E.chain(validateModel)
)

Defined in src/Firestore.ts:189

```haskell
getModelFromSnapshot :: Snapshot -> Either Model Error
```

#### Type declaration:

▸ (`snapshot`: DocumentSnapshot): *E.Either‹Error, [Model](#interfacesmodelmd)›*

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | DocumentSnapshot |

___

### `Const` getSnapshotFromCollection

• **getSnapshotFromCollection**: *function* = pipe(
  getDocumentFromCollection,
  R.map(getSnapshotFromDocument)
)

Defined in src/Firestore.ts:146

```haskell
getSnapshotFromCollection :: Collection -> ReaderTaskEither Model Snapshot Error
```

#### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#interfacesmodelmd), Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

### `Const` getSnapshotFromDocument

• **getSnapshotFromDocument**: *function* = pipe(
  getSnapshotFromDocumentTask,
  TEUtils.fromTask
)

Defined in src/Firestore.ts:134

```haskell
getSnapshotFromDocument :: Document -> TaskEither Snapshot Error
```

#### Type declaration:

▸ (`document`: DocumentReference): *TaskEither‹Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference |

___

### `Const` storeModelToCollection

• **storeModelToCollection**: *function* = pipe(
  getDocumentFromCollection,
  R.chain(storeModelToDocument)
)

Defined in src/Firestore.ts:85

```haskell
storeModelToCollection :: Collection -> Table -> ReaderTaskEither Model Model Error
```

#### Type declaration:

▸ (`collection`: CollectionReference): *ReaderTaskEither‹[Model](#interfacesmodelmd), Error, [Model](#interfacesmodelmd)›*

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference |

___

### `Const` storeModelToDocument

• **storeModelToDocument**: *function* = pipe(
  storeModelToDocumentTask,
  R.map(TEUtils.fromTask)
)

Defined in src/Firestore.ts:73

```haskell
storeModelToDocument :: Document -> ReaderTaskEither Model Model Error
```

#### Type declaration:

▸ (`document`: DocumentReference): *ReaderTaskEither‹[Model](#interfacesmodelmd), Error, [Model](#interfacesmodelmd)›*

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference |

___

### `Const` storeModelToFirestore

• **storeModelToFirestore**: *function* = pipe(
  getCollectionFromFirestore,
  R.map(storeModelToCollection)
)

Defined in src/Firestore.ts:97

```haskell
storeModelToFirestore :: Firestore -> Reader Table (ReaderTaskEither Model Model Error)
```

#### Type declaration:

▸ (`firestore`: Firestore): *Reader‹[Table](#interfacestablemd), ReaderTaskEither‹[Model](#interfacesmodelmd), Error, [Model](#interfacesmodelmd)››*

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore |

___

### `Const` validateModel

• **validateModel**: *function* = ifElse(isModel, E.right, () =>
  E.left(new Error('Item is not a valid model.'))
)

Defined in src/Firestore.ts:178

```haskell
validateModel :: a -> Either Model Error
```

#### Type declaration:

▸ (`a`: unknown): *E.Either‹Error, [Model](#interfacesmodelmd)›*

**Parameters:**

Name | Type |
------ | ------ |
`a` | unknown |

___

### `Const` validateSnapshotExistence

• **validateSnapshotExistence**: *function* = ifElse(prop('exists'), E.right, () =>
  E.left(new Error('Item does not exist.'))
)

Defined in src/Firestore.ts:167

```haskell
validateSnapshotExistence :: snapshot -> Either a Error
```

#### Type declaration:

▸ (`snapshot`: DocumentSnapshot): *E.Either‹Error, DocumentSnapshot›*

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | DocumentSnapshot |

## Functions

### `Const` clearEmulator

▸ **clearEmulator**(): *Promise‹void›*

Defined in src/Emulator.ts:26

```haskell
clearFirebase :: () -> Promise
```

**Returns:** *Promise‹void›*

___

### `Const` clearFirestore

▸ **clearFirestore**(): *Promise‹void›*

Defined in src/Emulator.ts:19

```haskell
clearFirestore :: () -> Promise
```

**Returns:** *Promise‹void›*

___

### `Const` fromTask

▸ **fromTask**(`task`: Task‹A›): *TaskEither‹Error, A›*

Defined in src/TaskEitherUtils.ts:10

```haskell
fromThunk :: Task -> TaskEither
```

**Parameters:**

Name | Type |
------ | ------ |
`task` | Task‹A› |

**Returns:** *TaskEither‹Error, A›*

___

### `Const` getCollectionFromFirestore

▸ **getCollectionFromFirestore**(`firestore`: Firestore‹›): *(Anonymous function)*

Defined in src/Firestore.ts:39

```haskell
getCollectionFromFirestore :: Firestore -> Reader Table Collection
```

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore‹› |

**Returns:** *(Anonymous function)*

___

### `Const` getDataFromSnapshot

▸ **getDataFromSnapshot**(`snapshot`: DocumentSnapshot‹object›): *object*

Defined in src/Firestore.ts:158

```haskell
getDataFromSnapshot :: Snapshot -> a
```

**Parameters:**

Name | Type |
------ | ------ |
`snapshot` | DocumentSnapshot‹object› |

**Returns:** *object*

* \[ **field**: *string*\]: any

___

### `Const` getDocumentFromCollection

▸ **getDocumentFromCollection**(`collection`: CollectionReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:50

```haskell
getDocumentFromCollection :: Collection -> Reader Model Document
```

**Parameters:**

Name | Type |
------ | ------ |
`collection` | CollectionReference‹object› |

**Returns:** *(Anonymous function)*

___

### `Const` getFirestore

▸ **getFirestore**(): *Firestore‹›*

Defined in src/Emulator.ts:12

```haskell
getFirestore :: () -> Firestore
```

**Returns:** *Firestore‹›*

___

### `Const` getSnapshotFromDocumentTask

▸ **getSnapshotFromDocumentTask**(`document`: DocumentReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:126

```haskell
getSnapshotFromDocumentTask :: Document -> Task Snapshot
```

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference‹object› |

**Returns:** *(Anonymous function)*

___

### `Const` id

▸ **id**(): *Arbitrary‹string›*

Defined in src/Arbitraries.ts:4

**Returns:** *Arbitrary‹string›*

___

### `Const` isModel

▸ **isModel**(`a`: unknown): *a is Model*

Defined in src/Firestore.ts:29

```haskell
isModel :: a -> bool
```

**Parameters:**

Name | Type |
------ | ------ |
`a` | unknown |

**Returns:** *a is Model*

___

### `Const` listCollectionsInFirestore

▸ **listCollectionsInFirestore**(`firestore`: Firestore‹›): *(Anonymous function)*

Defined in src/Firestore.ts:228

```haskell
listCollectionsInFirestore :: Firestore -> Task [Collection]
```

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | Firestore‹› |

**Returns:** *(Anonymous function)*

___

### `Const` model

▸ **model**(): *Arbitrary‹[Model](#interfacesmodelmd)›*

Defined in src/Arbitraries.ts:21

**Returns:** *Arbitrary‹[Model](#interfacesmodelmd)›*

___

### `Const` modelBase

▸ **modelBase**(): *Arbitrary‹[Model](#interfacesmodelmd)›*

Defined in src/Arbitraries.ts:9

**Returns:** *Arbitrary‹[Model](#interfacesmodelmd)›*

___

### `Const` modelData

▸ **modelData**(): *Arbitrary‹object›*

Defined in src/Arbitraries.ts:14

**Returns:** *Arbitrary‹object›*

___

### `Const` models

▸ **models**(): *Arbitrary‹Array‹[Model](#interfacesmodelmd)››*

Defined in src/Arbitraries.ts:26

**Returns:** *Arbitrary‹Array‹[Model](#interfacesmodelmd)››*

___

### `Const` nonModelObject

▸ **nonModelObject**(): *Arbitrary‹unknown›*

Defined in src/Arbitraries.ts:6

**Returns:** *Arbitrary‹unknown›*

___

### `Const` storeModelToDocumentTask

▸ **storeModelToDocumentTask**(`document`: DocumentReference‹object›): *(Anonymous function)*

Defined in src/Firestore.ts:61

```haskell
storeModelToDocumentTask :: Document -> Reader Model (Task Model)
```

**Parameters:**

Name | Type |
------ | ------ |
`document` | DocumentReference‹object› |

**Returns:** *(Anonymous function)*

___

### `Const` storeModelToFirestoreWith

▸ **storeModelToFirestoreWith**<**A**>(`firestore`: any): *(Anonymous function)*

Defined in src/Firestore.ts:114

```haskell
storeModelToFirestoreWith :: Firestore -> Reader Table (ReaderTaskEither (() -> Model) Model Error)
```

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`firestore` | any |

**Returns:** *(Anonymous function)*

___

### `Const` table

▸ **table**(): *Arbitrary‹[Table](#interfacestablemd)›*

Defined in src/Arbitraries.ts:28

**Returns:** *Arbitrary‹[Table](#interfacestablemd)›*


<a name="readmemd"></a>

[functional-firestore](#globalsmd)

# functional-firestore


# Interfaces


<a name="interfacesmodelmd"></a>

[functional-firestore](#globalsmd) › [Model](#interfacesmodelmd)

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


<a name="interfacestablemd"></a>

[functional-firestore](#globalsmd) › [Table](#interfacestablemd)

## Interface: Table

### Hierarchy

* **Table**

### Index

#### Properties

* [name](#name)

### Properties

####  name

• **name**: *string*

Defined in src/Firestore.ts:21
