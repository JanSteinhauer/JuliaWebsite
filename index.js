using WGLMakie, Bonito, FileIO
WGLMakie.activate!()

open("index.html", "w") do io
    println(io, """
    <html>
        <head>
        </head>
        <body>
    """)
    Page(exportable=true, offline=true)
    # Then, you can just inline plots or whatever you want :)
    # Of course it would make more sense to put this into a single app
    app = App() do
        C(x;kw...) = Card(x; height="fit-content", width="fit-content", kw...)
        figure = (; size=(300, 300))
        f1 = scatter(1:4; figure)
        f2 = mesh(load(assetpath("brain.stl")); figure)
        C(DOM.div(
            Bonito.StylableSlider(1:100),
            Row(C(f1), C(f2))
        ); padding="30px", margin="15px")
    end
    show(io, MIME"text/html"(), app)
    # or anything else from Bonito, or that can be displayed as html:
    println(io, """
        </body>
    </html>
    """)
end
