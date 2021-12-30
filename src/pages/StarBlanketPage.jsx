import star_blanket_lights from "../images/star_blanket/star_blanket_lights.jpg";
import star_blanket_dark from "../images/star_blanket/star_blanket_dark.jpg";


function StarBlanketPage() {

  return (
    <>
    <h2> Stitching Stars </h2>

        <p>
        In 2020, in an effort to better learn the map of the night sky, I set out to embroider a tapestry blanket with
        a planisphere of the Northern Hemisphere stars. After a year off and on of needlework, the stars have all been
        completed.
        </p>

        <img className="centered" src={star_blanket_dark} alt={"A black blanket with embroidered white dots for stars"}/>

        <p>
        The fourteen brightest stars (according to {" "}
            <a href="https://web.pa.msu.edu/courses/1997spring/isp205/sec-3/brightstars.html" target="_blank" 
            rel="noopener noreferrer">this list</a>) {" "}
            are wired with LED neopixels so that they light up.
        </p>

        <img className="centered" src={star_blanket_lights} alt="Black blanket with stars lit up"/>

        <p>
            As a next step, I am planning to program the lights to turn on in sections according to which part of 
            the sky is visible at night for each season of the year.
        </p>

        <p>
            I am also going to add lines connecting each of the constellations. I have been thinking of doing this in
            conjunction with a book of star myths, reading about each constellation as I'm embroidering it,
            and writing or making something inspired by the myths for each one.


        </p>

       
    </>
  );
}

export default StarBlanketPage;
