uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;

#include ../Shaders/includes/ambientLight.frag
#include ../Shaders/includes/directionalLight.frag
#include ../Shaders/includes/pointLight.frag


void main(){
    float ycoord = sin(uTime) * 2.0;
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = vec3(1.0,1.0,1.0);
    vec3 light = vec3(0.0);
    light += ambientLight(
    vec3(1.0),  // light color
    0.03              // light intensity    
    );
    light += directionalLight(
    vec3(0.1,0.1,1.0),         // light color
    1.0,                                 // light intensity    
    normal,                              // normal
    vec3(0.0,0.0,3.0),        // light position
    viewDirection,                       //view Direction
    20.0                                 //specular power     
    );
    light += pointLight(
    vec3(1.0,0.1,0.1),        // light color
    1.0,                                 // light intensity    
    normal,                              // normal
    vec3(0.0,ycoord,0.0),        // light position
    viewDirection,                       //view Direction
    20.0,                                //specular power
    vPosition,                           //position
    0.18    
    );
    light += pointLight(
    vec3(0.1,1.0,0.5),        // light color
    1.0,                                 // light intensity    
    normal,                              // normal
    vec3(2.0,2.0,2.0),        // light position
    viewDirection,                       //view Direction
    20.0,                                //specular power
    vPosition,                           //position
    0.18  
    );
    color *= light;
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>


}