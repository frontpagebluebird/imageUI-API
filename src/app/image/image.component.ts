import { Component, OnInit, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../services/api.service';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor(private http:HttpClient, private apiService:APIService) { }

  ngOnInit(): void {
    /*
    For encoding Base-64 strings:
    btoa() :  for encoding.
    */
    let myString = "Hello!";
    let encodedData = btoa(myString);
    console.log("Encoded : ",encodedData);

    // atob() :  Decodes a string of data that has been encoded using Base-64 encoding.
    console.log("Decoded : ",atob(encodedData));

    this.fetchAlbums();

  }

  albums: any[] = [];
  fetchAlbums(): void {
    this.apiService.getAPI_URL('Albums/GetAlbums').subscribe((data:any) => {
      this.albums = data.result;
      console.log("Result : ",data.result);
    });
  }

  getImageDataUrl(album: any): string {
    return 'data:' + album.contentType + ';base64,' + album.fileContents;
  }


  fetchAlbums_Images(albumID:any){
    this.apiService.getAPI_URL(`Albums/GetAlbumsImages?albumID=${albumID}`).subscribe((res:any)=>{
        console.log(res.result);
    });
  }


}

