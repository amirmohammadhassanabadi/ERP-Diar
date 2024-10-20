async function getTasks() {
    const response = await fetch("/tasks/gettasks");
    const tasks = await response.json();
    console.log(tasks);
    
}