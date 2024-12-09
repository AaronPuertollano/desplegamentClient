const getBreeds = async () => {
    const num = document.getElementById("num").value; 
    try {
        const res = await fetch(`https://api.thecatapi.com/v1/breeds?limit=${num}`);
        if (res.status === 200) {
            const breeds = await res.json();
            const breedsList = document.querySelector(".breeds");
            breedsList.innerHTML = "";

            breeds.forEach(breed => {
                const listItem = document.createElement("li");
                listItem.textContent = breed.name; 
                breedsList.appendChild(listItem);
            });
        } else {
            console.error(res.status);
        }
    } catch (e) {
        console.error("Error:", e);
    }
};

const init = () => {
    const btnSearch = document.querySelector("#search");
    btnSearch.onclick = getBreeds;
};

init();
