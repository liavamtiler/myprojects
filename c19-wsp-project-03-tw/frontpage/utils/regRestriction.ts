import moment from "moment";

export function lengthRange(userInput: number, minlength: number, maxlength: number): boolean {
  if (userInput >= minlength && userInput <= maxlength) {
    return true;
  } else return false;
}

// To check a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character

export function checkRegPassword(userInputPasswrod: string) {
  let password =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;;

  if (userInputPasswrod.match(password)) {
    return true;
  } else {
    return false;
  }
}

// to confirm member's age is bigger than 5

export function checkDateOFBirth(inputYearfBirth:string) {
    const ageRestriction = 5
    let formattedInput = moment(inputYearfBirth).format("YYYY")
    let presentYear = moment().format("YYYY")
    let difference = parseInt(presentYear)-parseInt(formattedInput)

    if (difference < ageRestriction) {
        return false
    }else return true 

}


