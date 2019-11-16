// MARK: - Рендеринг тайтла

function SetTitle() {
    let title = lastTitles[0];

    let name = titleName(lastTitles[0].title);
    let origName = titleOriginalName(lastTitles[0].title);
    let ep = seriesFromTitle(lastTitles[0].title);

    ReactDOM.render(
        <div>
            <div>
                <div id="web-player" class="player"></div>
            </div>
            <div class="container">
                <div>
                    <h2>{name}</h2>
                    <h3>{origName}</h3>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <img src={title.urlImagePreview}></img>
                        <h5>Год выхода: <small>{title.year}</small></h5>
                        <h5>Жанр: <small>{title.genre}</small></h5>
                        <h5>Тип: <small>{title.type}</small></h5>
                        <h5>Режиссер: <small>{title.director}</small></h5>
                        <h5>Серии: <small>{ep}</small></h5>
                    </div>
                    <div class="col-md-8">
                        <div>
                            <h5>Сюжет</h5>
                            {lastTitles[0].description}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("view")
    );

    loadPlaylist();
}

// MARK: - Рендеринг Элементов Списка

function RenderList() {
    ReactDOM.render(
        <div class="container">
            <div class="row">
                {lastTitles.map((val, index) =>{
                    let name = titleName(val.title);
                    let originalName = titleOriginalName(val.title);
                    let series = seriesFromTitle(val.title);
                    let link = "?id=" + val.id;

                    return <TitleCard link={link} title={name} original={originalName} series={series} image={val.urlImagePreview}></TitleCard>
                })}
                { () => {
                    if (getPageType() == "last") {
                        return <button type="button" class="btn btn-primary btn-lg btn-block" onclick="{loadPage();}">Загрузить больше</button>
                    }
                    return
                }
                }
            </div>
        </div>,
        document.getElementById("view")
    )
}

function TitleCard(props) {
    return <div class="col-6 col-md-3">
                <div class="card">
                    <a href={props.link}><img src={props.image} class="card-img-top" alt={props.title}></img></a>
                    <div class="card-body">
                        <a href={props.link}><h5 class="card-title">{props.title}</h5></a>
                        <h6>{props.original}</h6>
                        <p>{props.series}</p>
                    </div>
                </div>
            </div>;
}