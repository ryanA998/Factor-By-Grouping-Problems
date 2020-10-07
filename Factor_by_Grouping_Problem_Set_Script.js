//Factoring By Grouping Problem Set Script
//Author: Ryan Arendt
//Last Edited: 10/7/2020




let all_steps = gen_problems();


function gen_problems(){

    let pb_all_steps = [];
    let pb_coefs = [[1, 2, 1, 3],[2, 3, 2, 1],[1, 7, 1, 2],[1, 4, 2, 3],[5, 2, 2, 1],
        [3,1,2,3], [1,7,2,1], [3,1,3,2]];

    for(let i=0; i<pb_coefs.length; i++){
        let cur_index = i+1;
        let cur_step = sol_steps(pb_coefs[i]);
        pb_all_steps.push(cur_step);

        document.getElementById("pb_"+cur_index.toString()+"_eq").innerHTML = cur_step[0];
    }

    return pb_all_steps;
}

function has_valid_parenthesis(user_input){
    //Note: here there is only really one valid parenthsis ordering
    //namely: "()()". So we only need to check against that. 
    let are_pars_equal = false;
    let valid_pars = "()()";
    let user_pars = "";

    for(let i=0; i<user_input.length; i++){
        if(user_input[i] == "(" || user_input[i] == ")" ){
            user_pars += user_input[i];
        }
    }
   
    if(user_pars == valid_pars){
        are_pars_equal = true;
    }

    return are_pars_equal;
}


function check_answer(pb_num){
    //Checks if the answer that the user typed into the textbox is the same as 
    //the generated answer. (i.e. is there a valid answer/foiling yield valid result)
    let is_equal = false;

    let pb_index = pb_num-1;
    let pb_steps = all_steps[pb_index];


    let user_input = document.getElementById("ans_"+pb_num.toString()+"_input").value;
    try{
        
        let user_coef = extract_coef(user_input);
        let user_steps = sol_steps(user_coef);
    
        console.log("valid pars:",has_valid_parenthesis(user_input));
        if(pb_steps[0] == user_steps[0] && has_valid_parenthesis(user_input)){

            is_equal = true;
        }
    }
    catch(error){
        
    }
 
    return is_equal;
}


function extract_coef(user_input){
    //This function gets the numbers from a user generated input. For example the 
    //input (-2x+3)(x+5) should return an int list: [-2,3,1,5]
    
    let coef_store = [];
    let cur_num = "";

    for(let i=1; i<user_input.length-1; i++){
        let prev_char = user_input[i-1];
        let cur_char = user_input[i];

        //If the current charater is a "-", just add to the number string.
        if(cur_char == "-"){
            cur_num += cur_char;
        }
        //If the currnet character is a number, just add it to the number string.
        else if(isNaN(cur_char)==false){
            cur_num += cur_char;
        }
        //We need to handle the case if there is an "x" by itself: so check if
        //the previous character is an "-" or a "(" if so add the implied "1"
        else if(cur_char =="x" && (prev_char == "-" || prev_char == "(")){
            cur_num += "1";
        }
        //If the current number is NOT the empty string, push the number to the
        //coeiffent store list. Otherwise just reset the number to the empty string.
        else{
            if(cur_num != ""){
                //Convert from a string to a number
                coef_store.push(Number(cur_num));
            }

            cur_num = "";
        }
    }
    //Push the last number to the coefficient list.
    coef_store.push(cur_num);
    return coef_store;
}


function check_btn(pb_num){
    
    let check_box = document.getElementById("pb_"+pb_num+"_check_box");


    let is_correct = check_answer(pb_num);
    console.log("correct:",is_correct);

    if(is_correct){
       check_box.style.backgroundColor = 'rgb(7, 206, 7)';
    }
    else{
        check_box.style.backgroundColor = 'red';
    }
}


function sol_steps(ceof_list)
{   //This function generates the steps to a factor by grouping problem. It effectively
    //goes backwards and foils to generate each step. For example an input of
    //[1,2,1,3] (1x+2)(1x+3) ->...->... x^2 +5x + 6
    let ac = ceof_list[0]*ceof_list[2].toString();
    let ad = ceof_list[0]*ceof_list[3].toString();
    let bc = ceof_list[1]*ceof_list[2].toString();
    let bd = ceof_list[1]*ceof_list[3].toString();
    let ad_bc = ceof_list[0]*ceof_list[3]+ceof_list[1]*ceof_list[2].toString();

    let a = ceof_list[0].toString();
    let b = ceof_list[1].toString();
    let c = ceof_list[2].toString();
    let d = ceof_list[3].toString();

    let step_01 = ac+"x<sup>2</sup>+"+ad_bc+"x+"+bd; 
    let step_02 = ac+"x<sup>2</sup>+"+ad+"x+"+bc+"x+"+bd;
    let step_03 = "("+ac+"x<sup>2</sup>+"+ad+"x)+("+bc+"x+"+bd+")";
    let step_04 = a+"x"+"("+c+"x+"+d+")+"+b+"("+c+"x+"+d+")";
    let step_05 = "("+a+"x+"+b+")"+"("+c+"x+"+d+")";

    let steps = [step_01,step_02,step_03,step_04,step_05];
    return steps;
}   