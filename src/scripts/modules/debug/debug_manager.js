class DebugManager{
    logEnabled;
    objEnabled;
    conEnabled;
    wrnEnabled;
    errEnabled;
    constructor(params = {}){
        //Assign defaults for destructured parameters
        let modParams = Object.assign({
            log: false,
            obj: false,
            con: false,
            wrn: true,
            err: true
        }, params);
        
        this.objEnabled = modParams.obj;
        this.logEnabled = modParams.log;
        this.conEnabled = modParams.con;
        this.wrnEnabled = modParams.wrn;
        this.errEnabled = modParams.err;  
    }

    log(message = ""){
        if(!this.logEnabled){
            return;
        }

        let objStack = new Error().stack.split("\n")[1].match(/(?<path>.+\/(?<script>\w.+):(?<line>\d+):(?<column>\d+))/);
        let style = "font-size: 110%; color: #CFCFCF; background: #1F1F1F";
        console.group("%c" + "debug.log() in " + 
            objStack.groups.script + " at " + objStack.groups.line, style);
        if(message !== "" && message != null) { 
            console.log(message); 
        }
        console.groupEnd();
    }

    obj(obj = null, message = "", title = "",){
        if(!this.objEnabled){
            return;
        }
        
        if(title == null || title == ""){
            try{
                title = Object.getPrototypeOf(obj).constructor.name;
            }
            catch(error){
                title = "?";
            }
        }

        if(message == null){
            message = "";
        }

        let objStack = new Error().stack.split("\n")[1].match(/(?<path>.+\/(?<script>\w.+):(?<line>\d+):(?<column>\d+))/);
        let style = "font-size: 110%; color: #8FAFAF; background: #1F2F2F";
        console.groupCollapsed("%c" + "debug.obj(" + title + ") in " + objStack.groups.script + " at " + objStack.groups.line, style);
        if(message !== ""){ 
            console.group("Message");
            console.log(message); 
            console.groupEnd();
        }
        console.group("Object");
        console.log(obj);
        console.groupEnd();
        console.group("Trace");
        console.trace();
        console.groupEnd();
        console.groupEnd();
    }

    con(obj = null, message = "", title = "",){
        if(!this.conEnabled){
            return;
        }
        
        if(title == null || title == ""){
            try{
                title = Object.getPrototypeOf(obj).constructor.name;
            }
            catch(error){
                title = "?";
            }
        }

        if(message == null){
            message = "";
        }

        let objStack = new Error().stack.split("\n")[1].match(/(?<path>.+\/(?<script>\w.+):(?<line>\d+):(?<column>\d+))/);
        let style = "font-size: 110%; color: #AF8FAF; background: #2F1F2F";
        console.groupCollapsed("%c" + "debug.con(" + title + ") in " + objStack.groups.script + " at " + objStack.groups.line, style);
        if(message !== ""){ 
            console.group("Message");
            console.log(message); 
            console.groupEnd();
        }
        console.group("Object");
        console.log(obj);
        console.groupEnd();
        console.group("Trace");
        console.trace();
        console.groupEnd();
        console.groupEnd();
    }
}

export { DebugManager };