import findIndex from "lodash/findIndex"
class SignedInGuards {
    state= {
        guards:[]
    }

    addGuard(g) {
        console.log("dsfsd ")
        this.state.guards.push(g)

    }

    removeGuard(g) {
            this.state.guards=[...[...this.state.guards.slice(0, this.state.guards.indexOf(g)), ...this.state.guards.slice(this.state.guards.indexOf(g) + 1)]]
        console.log(this.state.guards)
    }
    getGuards() {
        return this.state.guards
    }

}


const instance = new SignedInGuards()
Object.freeze(instance)

export default instance
