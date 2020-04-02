import React from "react"
import { Link, Route, BrowserRouter } from "react-router-dom"
import MovieDetail from "./MovieDetail"

const DetailPage = (props) => {
  // 映画データの定義
  const movies = props.movies
  const setMovies = props.setMovies

  // 検索ワードをstateにする必要はない

  // APIキーを格納
  const API_KEY = "11474ff130f2d229944829565a279ac3"

  // デフォルトで表示される映画dieで検索している
  React.useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=die&page=1&include_adult=false`)
    .then(res=>res.json())
    .then(res=>{
      console.log(res.results)
      setMovies(res.results)
    })
  }, [])


  // 検索機能
  const handleSearch = (e) => {
    e.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${e.target.searchInput.value}&page=1&include_adult=false`)
    .then(res=>res.json())
    .then(res=>{
      console.log(res.results)
      setMovies(res.results)
    })
  }
  
  // ページ切替機能

  // 詳細を見る機能 押すと全体が


  return (
    <>
      {/* 検索ボタン */}
      <form onSubmit={(e)=>{handleSearch(e)}}>
        <input type="text" name="searchInput" />
        <button type="submit">検索</button>
      </form>
      {/* 検索結果を表示 */}
      <ul>
        { movies.map((movie, i)=>{
          return (
            <li>
              {/* <Link to={`/${movie.id}`}>{movie.title} */}
              {/* <h1>{movie.title}</h1> */}
              {/* </Link> */}
              
              {/* <Route path="/:id">
                <MovieDetail movie={movie}></MovieDetail>
              </Route> */}
              {/* <BrowserRouter>
              <Route path="/:id" render={(props)=><MovieDetail movie={movie}/>} />
              </BrowserRouter> */}
              <img src={"https://image.tmdb.org/t/p/w185" + movie.poster_path} alt=""/>
              <p>{movie.overview}</p>
            </li>
          )
        }) }
      </ul>
    </>
  )
}


export default DetailPage
