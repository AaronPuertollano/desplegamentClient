const getBreeds = async () => {
    try {
        const res = await fetch("https://api.thecatapi.com/v1/breeds");
        if (res.status === 200) {
            const breeds = await res.json();
            const breedsOpt = document.getElementById("breeds"); 

            breeds.forEach(breed => {
                const option = document.createElement("option");
                option.value = breed.id;
                option.textContent = breed.name;
                breedsOpt.appendChild(option);
            });
        } else {
            console.error(res.status);
        }
    } catch (e) {
        console.error("Error:", e);
    }
};

const fetchCat = async () => {
    const breed = document.getElementById("breeds").value; 
    try {
        const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`);
        if (res.status === 200) {
            const body = await res.json();
            if (body.length > 0) {
                document.getElementById("cat").src = body[0].url;
            } else {
                console.error("No image");
            }
        } else {
            console.error(res.status);
        }
    } catch (e) {
        console.error("Error: ", e);
    }
};

const init = () => {
    getBreeds(); 
    const btnSearch = document.querySelector("#search");
    btnSearch.onclick = fetchCat;
};

init();
