
import fig11 from "../images/where_computers_draw_lines/wcdl-figure11.png"

function CSPage() {
    return (
        <>
        <h2> Computer Science </h2>
        <hr/>

        <h3 className="centered">Kapwing</h3>
        <br/>

        <img className="centered" src="https://i.imgur.com/i7kd7H7.png" alt="Screenshot of the Kapwing creato studio"/>

        <p>
            I am currently working as a full-stack software engineer at <a href="https://www.kapwing.com/"> <b> Kapwing</b></a>, {" "}
            a collaborative browser-based video editor. Features I have implemented include {" "}
             <a href="https://www.kapwing.com/tools/remove-background" >removing video backgrounds</a> {" "}
            and <a href="https://www.kapwing.com/tools/green-screen">green screen/chroma key</a>. Read more about 
            the process behind chroma key in <a href="https://www.kapwing.com/blog/green-screen-in-browser/" > this blog article </a>.
        </p>
  
        <hr/>

        <h3 className="centered"> Where Networks Draw Lines: Computer Line Drawing with Deep Learning </h3>
        <br/>

        <img className="centered" src={fig11} 
            alt="Figure showing a visual comparison between different computer line drawing approaches"/>

        <p>
            Senior thesis in computer science, exploring the application of deep convolutional 
            neural networks to the problem of producing computer-generated line drawings 
            from three-dimensional models. The approach was based on predicting where people are 
            likely to draw lines to represent a given object, using the dataset collected by {" "}
            <a href="https://gfx.cs.princeton.edu/pubs/Cole_2008_WDP/">Cole et. al [2008]</a>. {" "}
            The performance of two network structures were evaluated, taking as input an array of properties representing 
            a three-dimensional object and a viewpoint, and predicting the average of where people 
            would draw lines to represent that object. In addition, the project examined different 
            possible methods for extracting a clean line drawing from the resulting prediction.
        </p>
        <p>
            Figure shows the visual comparison between the outputs from this process (top) and established line drawing algorithms (bottom).
        </p>
  
        </>
    );
  }
  
  export default CSPage;