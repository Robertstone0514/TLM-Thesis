// Takes in an Object
// Makes an Array with Sub-Arrays of the Objects key/value pairs
// Then removes Array brackets if the Array.isArray equals 'true'
// Else, if Array.isArray equals 'false,' return key/value pairs untouched
const remove_ArryBrackets_From_SubArray_Value = (obj) => {
  const array_Of_Sub_Arrays = Object.entries(obj)
    .map(([key, val]) => (Array.isArray(val) ? [key, val.join()] : [key, val]));
  // Returns an array with all of the [key,value] pairs of a given objects properties as sub-arrays
  return array_Of_Sub_Arrays;
};

// Takes in an Array with Sub-Arrays and creates new Object with key/value pairs from Sub-Arrays
const return_Obj_From_Array_Of_SubArrays = (array_Of_Sub_Arrays) => Object.fromEntries(
  array_Of_Sub_Arrays,
);

module.exports = { remove_ArryBrackets_From_SubArray_Value, return_Obj_From_Array_Of_SubArrays };
