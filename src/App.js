import React from "react"
import Pagination from '@material-ui/lab/Pagination'


const App = (props) => {
  // 映画データの定義
  const [movies, setMovies] = React.useState([])
  const [page, setPage] = React.useState()

  // ページ切替時のために検索ワードを保存しておく。デフォルトでdieで検索しているのでdieを初期値にする
  const [searchValue, setSearchValue] = React.useState("die")

  // APIキーを格納
  const API_KEY = "11474ff130f2d229944829565a279ac3"

  // デフォルトで表示される映画dieで検索している
  React.useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=die&page=1&include_adult=false`)
    .then(res=>res.json())
    .then(res=>{
      console.log(res.results)
      setMovies(res.results)
      setPage(res.total_pages)
    })
  }, [])


  // 検索機能
  const handleSearch = (e) => {
    e.preventDefault()

    // ページ変化時のために検索ワードを保存
    setSearchValue(e.target.searchInput.value)

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${e.target.searchInput.value}&page=1&include_adult=false`)
    .then(res=>res.json())
    .then(res=>{
      console.log(res.results)
      setMovies(res.results)
    })
  }
  
  // ページ切替機能
  const handlePage = page => {
    // 動作するかコンソールで確認
    console.log(page)

    // ページ切替時に別ページの内容をGETする
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}}&page=${page}&include_adult=false`)
    .then(res=>res.json())
    .then(res=>{
      console.log(res.results)
      setMovies(res.results)
    })
  }



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
              <p>----------------------</p>
              <h1>{movie.title}</h1>
              <img src={"https://image.tmdb.org/t/p/w185" + movie.poster_path} alt=""/>
              <p>{movie.overview}</p>
              
            </li>
          )
        }) }
      </ul>
      <Pagination count={page} onChange={(e, page)=>{handlePage(page)}}></Pagination>
    </>
  )
}


export default App
