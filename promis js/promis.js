//---------------------------------------------- Question 1 ----------------------------------------------//
// Write a function "counter" that returns a function that increments and logs a counter variable.
// The counter should start at 0 and increment by 1 each time the returned function is called.
// Use closure to maintain the state of the counter.

function counter() {
    let count = 0; 
    return function() {
      count++; 
      console.log(count); 
      return count; 
    };
}

const count = counter();
count(); 
count(); 
count(); 

console.assert(count() === 4, "[ Question:1 ] test case has failed." )


//---------------------------------------------- Question 2 ----------------------------------------------//
// Write a function "greet" that takes a person's name and returns a function that greets the person with the name provided.
// The returned function should log the greeting: "Hello, {name}!" using closure.

function greet(name) {
    return function() {
        return `Hello, ${name}!`;
}
}

const greetJohn = greet("John");
console.assert(greetJohn() === "Hello, John!", "[ Question:2 ] test case has failed.")
const greetJane = greet("Jane");
console.assert(greetJane() === "Hello, Jane!", "[ Question:2 ] test case has failed." )


//---------------------------------------------- Question 3 ----------------------------------------------//
// Write a function "sum" that takes an initial number "x" and returns a function that continues summing a number provided.
// Every call should add to the total sum. Use closure to maintain the state of the sum.
// Example:
// const add = sum(10);
// add(5); // 15
// add(2); // 17

  function sum(x) {
      let total = x; 

      return function(y) {
        total += y; 
        return total; 
      };
  }

const add = sum(10);
console.assert(add(5) === 15, "[ Question:3 ] test case has failed.")
console.assert(add(2) === 17, "[ Question:3 ] test case has failed." )


//---------------------------------------------- Question 4 ----------------------------------------------//
// Write an async function "delayedHello" that takes a name as an argument and returns "Hello, {name}!" after 2 seconds.
// Use async/await and promises.

async function delayedHello(name) {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Hello, ${name}!`); 
        }, 2000);
      });
}

delayedHello("Alice").then((result) => {
    console.assert(result === "Hello, Alice!", "[ Question:4 ] test case has failed." );
});


//---------------------------------------------- Question 5 ----------------------------------------------//
// Write a function "fetchData" that returns a promise, which resolves with "Data fetched" after 1 second.

function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Data fetched"); 
        }, 1000);
      });
}

fetchData().then((result) => {
    console.assert(result === "Data fetched", "[ Question:5 ] test case has failed." );
});


//---------------------------------------------- Question 6 ----------------------------------------------//
// Write a function "makeApiCall" that simulates an API call using promises. The function should take a URL as a parameter.
// If the URL is "good-url", resolve the promise with "API call successful" after 1 second.
// If the URL is "bad-url", reject the promise with "API call failed".

function makeApiCall(url) {
    return new Promise((resolve, reject) => {
    if(url.includes("good")){
      setTimeout(()=> {
        resolve("API call successful")
    }, 1000);
    }else {
      reject("API CALL FAILED")
    }
    })
  }


makeApiCall("good-url")
    .then((result) => {
        console.assert(result === "API call successful", "[ Question:6 ] test case has failed.")
    })
    .catch((error) => {
        console.assert(false, "[ Question:6 ] test case has failed.");
    });

makeApiCall("bad-url")
    .then(() => {
        console.assert(false, "[ Question:6 ] test case has failed.")
    })
    .catch((error) => {
        console.assert(error === "API call failed", "[ Question:6 ] test case has failed." );
    });


//---------------------------------------------- Question 7 ----------------------------------------------//
// Write a function "sequentialTasks" that executes two async tasks sequentially. 
// The first task is to call fetchData and the second task is to call delayedHello with a name argument.

async function sequentialTasks(name) {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Data fetched");
        }, 1000);
      });
    }
    
    async function delayedHello(name) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Hello, ${name}!`);
        }, 2000);
      });
    }
    
    async function sequentialTasks(name) {
      await fetchData();
      const result = await delayedHello(name); 
      return result; 
    }
sequentialTasks("Bob").then((result) => {
    console.assert(result === "Hello, Bob!", "[ Question:7 ] test case has failed." );
});


//---------------------------------------------- Question 8 ----------------------------------------------//
// Write a function "parallelTasks" that executes two async tasks in parallel using Promise.all.
// One task should call fetchData, and the other should call delayedHello with a name argument.

async function parallelTasks(name) {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Data fetched");
        }, 1000);
      });
    }
    
    async function delayedHello(name) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Hello, ${name}!`);
        }, 2000);
      });
    }
    
    async function parallelTasks(name) {
      const results = await Promise.all([fetchData(), delayedHello(name)]);
      return results; 
    }

parallelTasks("Charlie").then((results) => {
    console.assert(
        JSON.stringify(results) === JSON.stringify(["Data fetched", "Hello, Charlie!"]),
        "[ Question:8 ] test case has failed." 
    );
});


//---------------------------------------------- Question 9 ----------------------------------------------//
// Write a function "retryApiCall" that calls makeApiCall with a URL.
// If the call fails, retry it up to 3 times before rejecting the promise.

async function retryApiCall(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (url === "good-url") {
            resolve("API call successful");
          } else if (url === "bad-url") {
            reject("API call failed");
          }
        }, 1000);
      });
    }
    
    async function retryApiCall(url) {
      for (let attempts = 0; attempts < 3; attempts++) {
        try {
          const result = await makeApiCall(url); 
          return result; 
        } catch (error) {
          if (attempts === 2) {
            throw error; 
          }
     
        }
      }
    }
retryApiCall("bad-url")
    .then(() => {
        console.assert(false, "[ Question:9 ] test case has failed.");
    })
    .catch((error) => {
        console.assert(error === "API call failed", "[ Question:9 ] test case has failed." );
    });


//---------------------------------------------- Question 10 ----------------------------------------------//
// Write a function "raceToComplete" that takes an array of async tasks and resolves with the result of the first task to complete.
// Use Promise.race.

async function raceToComplete(tasks) {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Hello, ${name}!`);
        }, name === "Fast" ? 1000 : 2000); // הפסקה שונה עבור כל משימה
      });
    }
    
    async function raceToComplete(tasks) {
      const result = await Promise.race(tasks); // ממתין לתוצאה של המשימה הראשונה שמסתיימת
      return result; // מחזיר את התוצאה
    }

const task1 = delayedHello("Fast");
const task2 = delayedHello("Slow");

raceToComplete([task1, task2]).then((result) => {
    console.assert(result === "Hello, Fast!", "[ Question:10 ] test case has failed." );
});