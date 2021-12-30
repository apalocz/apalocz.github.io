
import fig5 from "../../images/where_computers_draw_lines/wcdl-figure5.png";
import fig8 from "../../images/where_computers_draw_lines/wcdl-figure8.png";
import fig9 from "../../images/where_computers_draw_lines/wcdl-figure9.png";
import fig11 from "../../images/where_computers_draw_lines/wcdl-figure11.png";

import { OutsideLink } from "../../components/commonComponents";

const fig5Caption = "Comparison of Model A and Model B test outputs to target drawings";
const fig8Caption = `A comparison of the line drawings produced by feeding the outputs of Model A to 
                    the ridge detection algorithm (top) and the sketch cleanup model (bottom)`;
const fig9Caption = `Comparison of drawings by Artist A and Artist B with predictions of different 
                viewpoints of the same object for both subjects.`;
const fig11Caption = (<>Visual comparison between the outputs from this process (top) and established 
                    line drawing algorithms (bottom). Figures for suggestive contours, apparent ridges, 
                    and ridges and valleys are from the prompts for {" "}
                    <a href="https://dl.acm.org/doi/10.1145/1531326.1531334" target="_blank" rel="noopener noreferrer">
                    Cole et. al [2009]</a></>);


function FigureWithCaption(props) {
    const {source, alt, caption} = props;

    return (
    <figure>
        <div className="flexcol vp-height">
        <img className="fit-container" src={source} alt={alt} />
            <figcaption> <i>{caption}</i> </figcaption>
        </div>
    </figure>

    )
}

function CompLineDrawingPage() {
    return (
        <>
        <h2> Where Networks Draw Lines: Computer Line Drawing with Deep Learning </h2>
        <hr/>

        <p>
            An undergraduate thesis in computer science, "Where Networks Draw Lines" explored the application {" "}
            of deep convolutional neural networks to the problem of producing computer-generated line drawings 
            from three-dimensional models. The approach was based on predicting where people are 
            likely to draw lines to represent a given object, using the dataset of human line drawings collected by {" "}
            <a href="https://gfx.cs.princeton.edu/pubs/Cole_2008_WDP/" target="_blank" rel="noopener noreferrer">
                Cole et. al [2008]</a>. {" "}

        </p>
        <p>
            The performance of two network structures were evaluated, each taking as input an array of properties representing 
            a three-dimensional object and a viewpoint and trained on weighted averages of human drawings
            as targets. The resulting prediction represents where people would be likely
            to draw lines to represent an object. Overall, Model A, which represented a simple network of flat convolutions, 
            learned faster and achieved both lower loss and visually closer outputs to the target than Model B, which used
            a structure of down-sampling, followed by flat convolutions, followed by up-sampling.</p>

         <FigureWithCaption source={fig5} caption={fig5Caption} 
            alt="figure showing averaged line drawings with their predicted counterparts"/>

        

        <p>
            In addition, the project examined different possible methods for extracting a clean line drawing 
            from the resulting prediction. The first used a <a href="https://arxiv.org/pdf/1901.09723.pdf" 
            target="_blank" rel="noopener noreferrer"> ridge detection algorithm</a>, while the second approach 
            treats the output as a sketch, and puts it through a <a href="https://esslab.jp/~ess/en/research/sketch/" 
            target="_blank" rel="noopener noreferrer"> machine learning model trained for sketch simplification</a>.
        </p>

        <FigureWithCaption source={fig8} caption={fig8Caption} 
            alt="figure showing line drawings produced by two methods"/>

        <p>
            Comparing both line drawings produced from the prediction on one of the test inputs to the outputs of 
            established line drawing algorithms 
            (<a href="https://dlnext.acm.org/doi/10.1145/1186562.1015768"  target="_blank" rel="noopener noreferrer"> 
            ridges and valleys</a>, {" "}
            <a href="https://people.csail.mit.edu/tjudd/apparentLines.pdf" target="_blank" rel="noopener noreferrer"> 
            apparent ridges</a>, and 
            <a href="https://gfx.cs.princeton.edu/pubs/DeCarlo_2003_SCF/DeCarlo2003.pdf" target="_blank" 
            rel="noopener noreferrer"> suggestive contours</a>) 
            shows that many of the lines produced resemble the features identified by one or more of the existing algorithms. 
         </p>

         <FigureWithCaption source={fig11} caption={fig11Caption} 
            alt="figure comparing the results of different line drawing methods"/>

        <p>
            The most interesting area is the small lines representing the curved features of the ends of the bone, 
            as this is where the results of the model vary most from any one of the approaches. Even though the lines 
            people draw tend to coincide with/are explainable by known feature lines, it is not always obvious 
            what combination people are most likely to use. The contribution of the neural network comes with 
            the possibility to learn to predict these combinations.
        </p>


        <hr/>

        <p> While the project mostly focused on generating predictions based on aggregates of inputs from all 
            the subjects in the dataset, I also tried training one of the models using targets from only one 
            artist, to see if its prediction could potentially learn to recognize an individual person's
            particular patterns. I used two subjects for this purpose: the first (artist 1) because they had the
            most drawings in the dataset, and the second (artist 2) because their contributions were noted in the
            source paper as consistently unusual. Even with very limited training data, there were differences in the 
            predictions for the two artists that reflected some of the differences between their actual drawings, 
            suggesting that this could be a promising avenue for future study. </p>

        <FigureWithCaption source={fig9} caption={fig9Caption} 
            alt="figure comparing the results of training the model on different artists"/>
  
        </>
    );
  }
  
  export default CompLineDrawingPage;