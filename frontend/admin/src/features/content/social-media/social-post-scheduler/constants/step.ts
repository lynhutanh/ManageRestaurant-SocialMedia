
import step1Schedule from '../image/Schedule_step_1.png';
import step2Schedule from '../image/Schedule_step_2.png';
import step3Schedule from '../image/Schedule_step_3.png';
import step4Schedule from '../image/Schedule_step_4.png';
import step1Update from '../image/Update_Delete_step_1.png'
import step2Update from '../image/Update_Step_2.png'
import step3Update from '../image/Update_Step_3.png'
import step2Delete from '../image/Delete_step_2.png'
import step1ViewScheduledPost from '../image/ViewSCheduledPost_step_1.png'
export const steps = {
    Schedule: [
        { title: "Step 1: Select Post", text: "Choose a post from the AI-generated list.", image: step1Schedule },
        { title: "Step 2: Input content and image_url", text: "Set content and image_url", image: step2Schedule },
        { title: "Step 3: Choose page and set time", text: "Choose page and set time", image: step3Schedule },
        { title: "Step 4: Confirm", text: "Confirm the scheduled post.", image: step4Schedule },
    ],
    View: [
        { title: "Step 1: Select page", text: "Select a page with a previously scheduled post", image: step1ViewScheduledPost },
        { title: "Step 2: Select a post", text: "Select the article you want to view details", image: step1Update },

    ],

    Update: [
        { title: "Step 1: Choose a post ", text: "Select a post from the calendar", image: step1Update },
        { title: "Step 2: Update new content", text: "Enter new content to update", image: step2Update },
        { title: "Step 3: Confirm ", text: "Click 'save changes'to save changes", image: step3Update },
    ],
    Delete: [
        { title: "Step 1: Choose a post ", text: "Select a post from the calendar", image: step1Update },
        { title: "Step 2: Confirm ", text: "Click 'Delete'to delete scheduled post", image: step2Delete },
    ],
};
