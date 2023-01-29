import { list } from '../../generalLibraries/list';
import { is_balanced } from './balanced';
console.log("the string \"[{()[]}]\" is okay:");
console.log(is_balanced(list("[", "{", "(", ")", "[", "]", "}", "]")));
console.log("the string \"[{(])[]}][\" is not okay:");
console.log(is_balanced(list("[","{","(","]",")","[","]","}","]","[")));