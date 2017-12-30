The mobile web is SLOW. We’ve become accustomed to developing large and complex applications with powerful desktop and laptop machines. 73% of mobile internet users say that they’ve encountered a website that was too slow to load [1]. The world of front end development is evolving continuously with more client-side heavy applications and with this, bundle sizes for many JS frameworks can be huge [2] [3]. This can significantly affect loading times, especially on a mobile device with a poor connection.

This talk will cover the concept behind the PRPL pattern, what it is and how you can use it to build a fast and reliable progressive single-page application.

We’ll talk about how you can:

* Push the most important resources first
* Render your initial route as soon as possible
* Pre-cache resources for all your routes using a Service Worker
* Lazy load your remaining routes so that they load on demand

[1] How Loading Time Affects Your Bottom Line (https://blog.kissmetrics.com/loading-time/)

[2] Alex Russell tweet (https://twitter.com/slightlylate/status/834507657209733121)

[3] Sizes of JS frameworks (https://gist.github.com/Restuta/cda69e50a853aa64912d)
