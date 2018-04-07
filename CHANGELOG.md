# Changelog

## 1.7.0

Features:
* New `unshiftAt` function

## 1.5.4 (should be 1.6.0)

Features:
* New `pushAt` function

## 1.5.3

Fixes:
* Handle intermediate null values paths

Performance:
* Avoid some recursions (replaceAt)

Doc:
* Running tests

## 1.5.2

Fixes:
* `deleteAt` with wrong path just return src value now

Performance:
* Avoid some recursions (getAt)

## 1.5.1

Features:
* New `createStructuredSelector` function

## 1.4.3

Features:
* New `createSelector` function
* New docs and tests:
  * reupdate vs reselect
  * redux + reupdate
  * react + reupdate

## 1.3.2

Remove extra `lodash/*` dependencies

## 1.3.1

Array specific functions

## 1.2.5

Documentation fixes

## 1.2.3

### Features
* Separated function imports: 
  ```jsx harmony
  import set from 'reupdate/set';
  ``` 
* New functions:
  * setAt
  * deleteAt
  * extendAt  
  