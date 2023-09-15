export class ReturnArgs {
    result: boolean;
    messages : Array<string> | undefined ;
    constructor(initResult: boolean) {
       this.result = initResult;
       this.messages = new Array<string>();
    }
    
    setMessage = (resultArg: boolean, message:string) => {
        this.result &&= resultArg;
        if(message != undefined && message.length > 0){
            this.messages?.push(message);
        }
    };
  }
  