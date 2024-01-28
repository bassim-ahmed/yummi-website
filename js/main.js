search("").then(() => {
    $(".loading-screen").fadeOut(500, () => {
        $("body").css("overflow", "visible")
    })
})


$(document).scroll((e) => {

    if ($(document).scrollTop()) {
        $(".my").css("backgroundColor", "#0D0D0D")
    }
});

let userName,
    userEmail,
    userPhone,
    userAge,
    userPassword,
    userRePassword


var nvWidth = 0,
    isTrue = !0,
    arr = [];

// Function to handle click event on .strip-toggel-menu
$(".strip-toggel-menu").click(function () {
    // Ternary operator to check if isTrue is true or false
    isTrue ? (
        // If isTrue is true
        $(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"), 
        nvWidth = $(".nav-tab-menu").width() - 10, 
        $(".strip-header-nav").css("left", nvWidth), 
        $(".fa-align-justify").toggleClass("fa-times"), 
        // Animations for menu items
        $(".nav-tab-menu .item1").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1000), 
        $(".nav-tab-menu .item2").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1100), 
        $(".nav-tab-menu .item3").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1200), 
        $(".nav-tab-menu .item4").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1300), 
        $(".nav-tab-menu .item5").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1500), 
        $(".nav-tab-menu .item6").animate({
            opacity: "1",
            paddingTop: "25px"
        }, 1500), 
      
        isTrue = !isTrue
    ) : (
        $(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"), 
        $(".fa-align-justify").toggleClass("fa-times"), 
        $(".strip-header-nav").css("left", 0), 
        $(".nav-tab-menu li").animate({
            opacity: "0",
            paddingTop: "500px"
        }, 500), 
        isTrue = !isTrue
    )
});

/**
 * Performs a search for meals based on the provided query.
 */
async function search(query) {
    // Make a fetch request to the meal API with the provided query
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    
    // Convert the response to JSON
    const data = await response.json()
    
    // Display the meals
    displayMeals(data.meals)
    
    return data
}
/**
 * Display the meals in array
 */
function displayMeals(arr) {
    let meals = ""
    for (let i = 0; i < arr.length; i++) {
        meals += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow">
            <div onclick="getMeal('${arr[i].idMeal}')" class="movie shadow rounded position-relative">
                <div class="post ">
                    <img src='${arr[i].strMealThumb}' class="w-100 rounded" />
                    <div class="layer d-flex align-items-center ">
                        <div class="info p-2">
                            <h2>${arr[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    row.innerHTML = meals; // Assuming `row` is defined elsewhere
}
var row = document.getElementById("rowData");



async function getCategories(listBy) {
    // Fetch categories from the MealDB API based on the listBy parameter
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${listBy}`);
    // Extract JSON data from the response
    const data = await response.json();
    // Return the retrieved categories data
    return data;
};
/**
 * Asynchronously fetches meals based on the first letter of the meal name
 */
async function getMealsByLetter(letter) {
    if (letter) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        let meals = await response.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
    }
};

/**
 * Fetches meals by category from the MealDB API
 */
async function filterByCategory(category) {
    // Make a GET request to the MealDB API with the specified category
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    // Convert the response to JSON
    const data = await response.json();
    // Display the meals on the webpage
    displayMeals(data.meals);
}

/**
 * Display categories on the webpage using the global variable arr
 */
function displayCategories() {
    let e = ""
    for (var i = 0; i < arr.length; i++) e += `
    <div class="col-md-6 col-lg-3 my-3 myM shadow text-center">
        <div class="movie shadow rounded position-relative">
            <div onclick="filterByCategory('${arr[i].strCategory}')" class="post">
                <img src='${arr[i].strCategoryThumb}' class="w-100 rounded" />
                <div class="layer d-flex align-items-center ">
                    <div class="info p-2">
                        <h2>${arr[i].strCategory}</h2>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    row.innerHTML = e
};
/**
 * Fetches meals by area and displays the first 20 meals.
 */
async function filterByArea(area) {
    // Fetch meals by area from the MealDB API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    // Convert the response to JSON
    const data = await response.json();
    displayMeals(data.meals.slice(0, 20));
}

/**
 * Display area function to generate HTML for each area
 */
function displayArea() {
    let e = ""
    for (var i = 0; i < arr.length; i++) {
        e += `
        <div class="col-md-6 col-lg-3 my-3 myM  shadow text-center">
            <div class="movie shadow rounded position-relative">
                <div onclick=(filterByArea('${arr[i].strArea}')) class="post ">
                    <i class="fa-solid fa-city uy fa-3x"></i>
                    <h2 class="text-white">${arr[i].strArea}</h2>
                </div>
            </div>
        </div>`
    }
    row.innerHTML = e;
};
/**
 * Asynchronously fetches the main ingredient based on the given name.
 */
async function getMainIngredient(Name) {
    // Fetch meals based on the provided ingredient name
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Name}`)
    meal = await meal.json()
    // Display the fetched meals
    displayMeals(meal.meals)
};

function displayIngredients() {
    let e = ""
    for (var i = 0; i < arr.length; i++) e += `
    <div class="col-md-6 col-lg-3 my-3 myM  shadow text-center">
        <div onclick="getMainIngredient('${arr[i].strIngredient}')" class="movie shadow rounded position-relative">
            <div class="post ">
                <i class="fa-solid fa-bowl-food ty fa-3x"></i>
                <h2 class="text-white">${arr[i].strIngredient}</h2>
                <p class="text-white">${arr[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>`
    row.innerHTML = e;
};

/**
 * Fetches meal data from the API and displays it on the webpage
 * @param {string} mealId - The ID of the meal to fetch
 */
async function getMeal(mealId) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const mealData = await response.json();
    displayMeal(mealData.meals[0]);
}

/**
 * Displays the meal details on the webpage
 * @param {object} meal - The meal object to display
 */
function displayMeal(meal) {
    // Generate recipe list
    let recip = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recip += `<li class="my-3 mx-1 p-1 ss rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    // Generate tags list
    let tgs = meal.strTags?.split(",")
    let tagsStr = "" 
    for (let i = 0; i < tgs?.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 dar rounded">${tgs[i]}</li>`
    }

    // Generate the meal details HTML
    let str = `
    <div class="col-md-4 myM text-white">
                    <img class="w-100" src="${meal.strMealThumb}" ><br>
                    <h1>${meal.strMeal}</h1>
                </div>
                <div class="col-md-8 myM text-white text-left">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
                    <p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
                    <h3>Recipes :</h3>
                    <ul class="d-flex " id="recipes">
                    </ul>

                    <h3 class="my-2 mx-1 p-1">Tags :</h3>
                    <ul class="d-flex " id="tags">
                    </ul>

                    
                    <a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
                    <a class="btn btn-danger text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
                </div>`
    // Update the HTML content
    row.innerHTML = str
    document.getElementById("recipes").innerHTML = recip
    document.getElementById("tags").innerHTML = tagsStr
};

function signup() 
{
    var sign= 
    {
        name: userName.value,
        email: userEmail.value,
        phone: userPhone.value,
        age: userAge.value,
        password: userPassword.value,
        re: userRePassword.value,
    }
      arr.push(sign)
      localStorage.setItem('register', JSON.stringify(arr))
      document.getElementById('us').innerHTML ="Success";
   
   clearForm();
}
function clearForm() 
{
    userName.value="";
    userEmail.value= "";
    userPhone.value= "";
    userAge.value= "";
    userPassword.value= "";
    userRePassword.value= "";
}


$(".nav-item a").click(async (e) => {
    let listBy = e.target.getAttribute("data-list")
    document.getElementById("search-container").innerHTML = ""
    row.innerHTML = ""
    if (listBy == "contact") {

        row.innerHTML = `
        <section id="contact" class="container myM w-75 mx-auto mb-5 text-center ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control shadow " onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
					</div>
				</div>

                <div id="us" class="text-danger mt-3"></div>
			</div>

			<button onclick="signup();" disabled type="submit" id="submitBtn" class="btn btn-outline-danger mt-3">Submit</button>
		</div>

	</section>`
           userName = document.getElementById("name"),
            userEmail = document.getElementById("email"),
            userPhone = document.getElementById("phone"),
            userAge = document.getElementById("age"),
            userPassword = document.getElementById("password"),
            userRePassword = document.getElementById("rePassword")
        
            if (localStorage.getItem('products') != null) {
                arr = JSON.parse(localStorage.getItem('products'));
            }
    }
    if (listBy == "search") {
        row.innerHTML = ""
        document.getElementById("search-container").innerHTML = `
        <div class="row">
				<div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
				</div>
				<div class="col-md-6">
					<input class="form-control " type="text" maxlength="1" id="letter"
						placeholder="search By First Letter...">
				</div>

			</div>`

        $("#searchInput").keyup((e) => {
            search(e.target.value)
        })
        $("#letter").keyup((e) => {
            getMealsByLetter(e.target.value)
        })

        $('#letter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }

    let click_event = new CustomEvent('click');
    document.querySelector('.strip-toggel-menu').dispatchEvent(click_event);
    let x;
    if (listBy == "categories") {
        x = await getCategories(listBy + ".php")
        arr = x.categories.splice(0, 20);
        displayCategories()
    } else if (listBy == "a") {
        x = await getCategories("list.php?a=list")
        arr = x.meals.splice(0, 20);
        displayArea()
    } else if (listBy == "i") {
        x = await getCategories("list.php?i=list")
        arr = x.meals.splice(0, 20);
        displayIngredients()
    }
})

function userNameValid() {
    var nameregex=/^[a-zA-Z ]+$/
    if(nameregex.test(userName.value)==true)
    {
        return true;
    }
    else
    {
        return false;
    }
};

function userEmailValid() {
    var emailregex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     if(emailregex.test(userEmail.value)==true)
     {
        return true;
     }
     else
     {
        return false;
     }
};

function userPhoneValid() {
    var phoneregex =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if(phoneregex.test(userPhone.value)==true)
    {
        return true;
    }
    else
    {
        return false;
    }
};

function userAgeValid() {
    var ageregex =/^[1-9][0-9]?$|^100$/;
    if(ageregex.test(userAge.value)==true)
    {
        return true;
    }
    else
    {
        return false;
    };
};

function userPasswordValid() {
    var passwordregex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(passwordregex.test(userPassword.value)==true)
    {
        return true;
    }
    else
    {
        return false;
    }
};

function userRePasswordValid() {
    if(userPassword.value == userRePassword.value)
    {
        return true;
    }
    else
    {
        return false;
    };
};

function validation() 
{
    if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
        document.getElementById("submitBtn").removeAttribute("disabled")
    }
    else
    {
        document.getElementById("submitBtn").setAttribute("disabled","true")
    }
}
