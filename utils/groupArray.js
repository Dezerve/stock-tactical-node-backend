// Example array of objects
const arrayOfObjects = [
  { id: 1, category: "A", value: "foo" },
  { id: 2, category: "B", value: "bar" },
  { id: 3, category: "A", value: "baz" },
  { id: 3, category: "A", value: "john" },
  { id: 3, category: "A", value: "jake" },
  { id: 3, category: "C", value: "baz" },
  { id: 3, category: "C", value: "baz" },
  { id: 3, category: "C", value: "baz" },
  { id: 3, category: "B", value: "marie" },
  // ... (more objects)
];

const groupArrayOfObjects = (arrayToGroup) => {
  // Use reduce to group objects by the 'category' key
  const groupedArray = arrayToGroup.reduce((result, obj) => {
    // Find the existing group based on the 'category' key
    const group = result.find((group) => group[0]?.category === obj.category);

    if (group) {
      // If group exists, add the object to the existing group
      group.push(obj);
    } else {
      // If no group exists, create a new group with the current object
      result.push([obj]);
    }

    return result;
  }, []);
  return groupedArray;
};

// start log
process.env.NODE_ENV?.toLowerCase().trim() === "production" ||
process.env.NODE_ENV?.toLowerCase().trim() === "prod"
  ? console.log("created!")
  : console.log("arrays: ", groupArrayOfObjects(arrayOfObjects));
// end log
