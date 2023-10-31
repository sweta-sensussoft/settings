import * as _ from "lodash";
import { ReturnArgs } from "./returnArgs";
/**
 * Compares two objects.
 * @return {boolean} If all the properties in propertiesToCompare parameter are equeal it returns true
 * future operations.
 * @param {object} obj1 First object to compare.
 * @param {object} obj2 Second object to compare.
 * @param {Array<string>} propertiesToCompare Collection of properties to be compare.
 * If propertiesToCompare is not pass all the keys within first object will be compare with second object
 */
export const compareObjects = (obj1:object, obj2:object, propertiesToCompare:Array<string> | undefined=undefined) :ReturnArgs => {
    if(propertiesToCompare === undefined){
      propertiesToCompare = Object.keys(obj1);
    }
    //logToConsole("obj1",obj1);
    //logToConsole("obj2",obj2);
    let returnArgs = new ReturnArgs(true);
    //logToConsole("returnArgs",returnArgs);
    propertiesToCompare.forEach(property => {
       if(compare(obj1, obj2, property)==false){
        returnArgs.setMessage(false,`Object Values does not match for property :${property}`)
       }
    });
    
    return returnArgs;
  }
  
  /**
   * Compares a property of two objects.
   * @return {boolean} If all the properties in propertiesToCompare parameter are equeal it returns true
   * future operations.
   * @param {object} obj1 First object to compare.
   * @param {object} obj2 Second object to compare.
   * @param {string} property property to compare.
   */
export const compare = (obj1: object, obj2: object, property: string): boolean => {
  //console.log(`:${property}-${_.get(obj1,property)}-${_.get(obj2,property)}-${_.get(obj1,property)!=_.get(obj2,property)}`);
  if (_.get(obj1,property)!=_.get(obj2,property)){
      //console.log(`Object Values does not match for property :${property}`);
      return false;
    }
    return true;
  }

  /**
 * Logs wellformed object into the console.
 * future operations.
 * @param {string} header display header.
 * @param {object} obj2 object to print.
 */
export const logToConsole = (header:string,obj: object) => {
  // console.log(`${header} :${JSON.stringify(obj, null, 3)}`);

}