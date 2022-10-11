
export async function getMap() {
    console.log("getting map")
    const response = await fetch("https://maps.shotlandint.golf/event_30_hole_9.json")
    var data = await response.json();
    console.log(data)
    return data;
}