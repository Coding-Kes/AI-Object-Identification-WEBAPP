
status = "";
objects = [];

function setup()
{
    canvas = createCanvas(620, 480);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(620, 480);
    video.hide();
}

function modelLoaded()
{
    console.log("CoCoSSD Model Is Loaded");
    status = true;
}

function Start()
{
    objectDetector = ml5.objectDetector('cocossdd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    userinput = document.getElementById("input").value;
}

function draw()
{
    image(video, 0, 0, 600, 500);

    if(status != "")
    {
        objectDetector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Detecting The Object";
            document.getElementById("object-status").innerHTML = userinput+"is being found";

            fill("#FFD700");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label+" "+percent+"%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("#FFD700");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            strokeWeight(2);

            if(objects[i].label == userinput)
            {
                document.getElementById("object-status").innerHTML = userinput+" has been found";
            }
            else
            {
                document.getElementById("object-status").innerHTML = userinput+" has not been found";
            }
        }
    }
}

function gotResults(error, results)
{
    if(error)
    {
        console.error();
    }
    else
    {
        console.log(results);
        objects = results;
    }
}