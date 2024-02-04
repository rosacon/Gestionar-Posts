import {render, screen, fireEvent} from '@testing-library/react';
import {ListPosts} from './components/ListPosts';


describe('<ListPosts />',() =>{
    test("renders the post component", () => {
      render(<ListPosts />);
      const buttonElement=screen.getByText(/Post/);     
    
      expect(buttonElement).toBeInTheDocument();

    })    
    
});


