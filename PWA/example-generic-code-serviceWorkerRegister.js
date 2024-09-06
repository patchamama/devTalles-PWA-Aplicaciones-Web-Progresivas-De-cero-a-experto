// This optional code is used to register a service worker.
const fn = Boolean(
    "localhost" === window.location.hostname ||
    "[::1]" === window.location.hostname ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
)
function yn(e, t) {
    navigator.serviceWorker
    .register(e)
    .then((e) => {
        e.onupdatefound = () => {
        const a = e.installing
        null != a &&
            (a.onstatechange = () => {
            "installed" === a.state &&
                (navigator.serviceWorker.controller
                ? (console.log(
                    "New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."
                    ),
                    t && t.onUpdate && t.A(e))
                : (console.log("Content is cached for offline use."),
                    t && t.onSuccess && t.onSuccess(e)))
            })
        }
    })
    .catch((e) => {
        console.error("Error during service worker registration:", e)
    })
}
(function (e) {
    if ("serviceWorker" in navigator) {
        if (new URL("", window.location.href).origin !== window.location.origin) {
            // return
        } else {
            window.addEventListener("load", () => {
                const t = "/service-worker.js"
                fn
                    ? (!(function (e, t) {
                        fetch(e, { headers: { "Service-Worker": "script" } })
                        .then((a) => {
                            const n = a.headers.get("content-type")
                            404 === a.status || (null != n && -1 === n.indexOf("javascript"))
                            ? navigator.serviceWorker.ready.then((e) => {
                                e.unregister().then(() => {
                                    window.location.reload()
                                })
                                })
                            : yn(e, t)
                        })
                        .catch(() => {
                            console.log("No internet connection found. App is running in offline mode.")
                        })
                    })(t, e),
                    navigator.serviceWorker.ready.then(() => {
                        console.log(
                        "This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA"
                        )
                    }))
                    : yn(t, e)
                })
        }
        
    }
})()
