import createHistory from "history/createBrowserHistory";

const history = createHistory({
    basename: "",
    forceRefresh: true
})

export { history }  