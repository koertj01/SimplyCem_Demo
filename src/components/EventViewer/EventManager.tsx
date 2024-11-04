class EventManager {
    private listeners: Map<string, Array<(data: any) => Promise<void> | void>>;

    constructor() {
        this.listeners = new Map();
    }

    //Method to register an event listener
    public on(event: string, callback: (data: any) => Promise<void> | void): void {
        //Check if the event already has listeners
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        // add the callback to the listeners for this event
        this.listeners.get(event)?.push(callback);
    }

    //Method to unregister an event listener
    public off(event: string, callback: (data: any) => Promise<void> | void): void {
        // Check if the event has listeners
        if (!this.listeners.has(event)) return;
        
        // Removee teh specific callback from the listeners
        const callbacks = this.listeners.get(event);
        this.listeners.set(event, callbacks?.filter(cb => cb !== callback) || [] );
    }

    // Method to trigger an event
    public async emit(event: string, data: any): Promise<void> {
        //get the list of listeners for the event
        const callbacks = this.listeners.get(event);
        if (!callbacks) return;

        //iterate over each listern and call it with the data
        for (const callback of callbacks) {
            await callback(data); //await in case of async callbacks
        }
    }

    //logging
    public log(message: string, level: 'info' | 'warn' | 'error'): void {
        //Implement logging logic here (e.g console.log or sending to an externa data source)
        console.log("Level: %, Message: % ", level, message);
    }
}

enum UserEventTypes {
    LogOn = 'log-on',
    LogOff = 'log-off',
    CreateAccount = 'create-account', 
}


//TODO move this to another file and sync with the actual user log-in methods 
const userEventManager = new EventManager();
//TODO:  we need to add time stamping
//TODO: We need to log certain user actions as well 
//TODO: we need to log what the permission account type is for that user

userEventManager.on(UserEventTypes.LogOn, (user) => {
    userEventManager.log(`User logged on: ${user.username}`, 'info')
    //Update global state or perform other actions
});

userEventManager.on(UserEventTypes.LogOff, (user) => {
    userEventManager.log(`User logged off: ${user.username}`, 'info')
    //Update global state or perform other actions
});

userEventManager.on(UserEventTypes.CreateAccount, (user) => {
    userEventManager.log(`Created New User Account: ${user.username}`, 'info')
    // Update global state or perform other actions
    //TODO: this is more complex as if an admin creates a new account we want to also log the user that performed the action 
})


/// How to user our emitters in the rest of the code to trigger the activity

//TODO: action correlate this with an actual logon 
const user = { username: 'john_doe' };
// when a user logs in
userEventManager.emit(UserEventTypes.LogOn, user);
// when a user logs off
userEventManager.emit(UserEventTypes.LogOff, user);
// when a user account is created
userEventManager.emit(UserEventTypes.CreateAccount, user);

