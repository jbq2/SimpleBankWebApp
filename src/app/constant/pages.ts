/**
 * this is a constant class containing a static Map
 * tabLinks Map contains the tab names and their respective url extensions
 * TODO: implement accounts, profile and sign out 
 */

export class Pages {
    public static tabLinks: Map<string, string> = new Map([
        ["Login", "/login"],
        ["Register", "/register"],
        ["Accounts", "/#"],
        ["Profile", "/#"],
        ["Sign Out", "/#"]
    ]);
}