<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MovieController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index($page = 1)
	{
		$client = new \GuzzleHttp\Client();
		$request = $client->get('https://api.themoviedb.org/3/movie/upcoming', ['query' => 'api_key=1f54bd990f1cdfb230adb312546d765d&language=pt-br&page='.$page]);
		$response = json_decode($request->getBody()->getContents(), true);

		$genres = $this->genres();

		foreach ($response['results'] as $key => $value) {
			$arrFinal[$key] = $value;
			foreach($value['genre_ids'] as $g) {
				$arrFinal[$key]['genres'] = (array_key_exists('genres', $arrFinal[$key])) ? $arrFinal[$key]['genres'].', '.$this->searchForId($g, $genres) : $this->searchForId($g, $genres);
			}
			
		}
		return \Response::json($arrFinal);
	}

	function searchForId($id, $array) {
		foreach ($array as $key => $val) {
			if ($val['id'] === $id) {
				return $val['name'];
			}
		}
		return null;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		//
	}

	public function pagination()
	{
		$client = new \GuzzleHttp\Client();
		$request = $client->get('https://api.themoviedb.org/3/movie/upcoming', ['query' => 'api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US']);
		$response = json_decode($request->getBody()->getContents(), true);

	   
		return \Response::json($response['total_pages']);
	}
	public function search($search)
	{
		$client = new \GuzzleHttp\Client();
		$request = $client->get('https://api.themoviedb.org/3/search/movie', ['query' => 'api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US&query='.$search]);
		$response = json_decode($request->getBody()->getContents(), true);

	   
		return \Response::json($response);
	}
	public function genres()
	{
		$client = new \GuzzleHttp\Client();
		$request = $client->get('https://api.themoviedb.org/3/genre/movie/list', ['query' => 'api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US']);
		$response = json_decode($request->getBody()->getContents(), true);
	   
		return $response['genres'];
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		$client = new \GuzzleHttp\Client();
		$request = $client->get('https://api.themoviedb.org/3/movie/'.$id, ['query' => 'api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US']);
		$response = json_decode($request->getBody()->getContents(), true);
	   
		return \Response::json($response);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		//
	}
}
