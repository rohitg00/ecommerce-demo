import { HarmonyPlatform } from '@bitdev/harmony.harmony-platform';
// import { KubernetesAspect } from '@bitdev/symphony.deployers.kubernetes';
import { NodeJSRuntime } from '@bitdev/harmony.runtimes.nodejs-runtime';
import { BrowserRuntime } from '@bitdev/harmony.runtimes.browser-runtime';
import { SymphonyPlatformAspect } from '@bitdev/symphony.symphony-platform';
import { PeopleAspect } from '@pied/people.people';
import { PiedPlatformAspect } from '@pied/pied-piper.pied-platform'; 
import { CartAspect } from '@dras/ecommerce-demo.cart';
/**
  * compose the ecommerce-demo platform.
  */    
export const EcommerceDemo = HarmonyPlatform.from({
  name: 'ecommerce-demo',
  platform: [SymphonyPlatformAspect, {
    name: 'Ecommerce Demo',
    slogan: 'Ecommerce Demo',
    domain: 'ecommerce-demo.teambit.games',
    logo: 'https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png',
  }],

  runtimes: [
    new BrowserRuntime(), 
    new NodeJSRuntime()
  ],

  aspects: [
    // feature to compose into the platofrm.
    PeopleAspect,
    PiedPlatformAspect,
    CartAspect,
    // To deploy the platform on a Kubernetes cluster, use the official Kubernetes deployer 
    // for Harmony. @see https://bit.cloud/bitdev/symphony/deployers/kubernetes
  //   [KubernetesAspect, {
  //     /**
  //      * kubernetes auth
  //      */
  //     auth: {
  //       basic: {
  //         /**
  //          * certificate
  //          */
  //         certificate: process.env.KUBE_CERTIFICATE_AUTHORITY_DATA,

  //         /**
  //          * server
  //          */
  //         server: process.env.KUBE_SERVER,

  //         /**
  //          * token
  //          */
  //         token: process.env.KUBE_USER_TOKEN,
  //       },
  //     },
      
  //     /**
  //      * docker config for creating and pushing
  //      * images from the build pipeline.
  //      */
  //     docker: {
  //       /**
  //        * prefix to use for docker images.
  //        */
  //       imagePrefix: 'piedpiperapp',

  //       /**
  //        * docker auth
  //        */
  //       auth: {
  //         username: process.env.DOCKERHUB_USERNAME,
  //         password: process.env.DOCKERHUB_TOKEN,
  //       },
  //     },
  //   }],     
  ],
});

export default EcommerceDemo;
