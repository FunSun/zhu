import { renderLuis, setupTestBridge } from 'luis';

// this needs to be there to set up custom global function that luis uses
// such as: storyOf
setupTestBridge();

// import all your stories and tests
import './app/components/SlateEditor.test';

// render luis ui to '#react-root'
renderLuis()
