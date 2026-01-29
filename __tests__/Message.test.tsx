import { Image } from 'react-native';
import { Message } from '../src/components/Message';
import { Message as MessageType } from '../src/types';
import { fireEvent, render, screen } from '@testing-library/react-native';

jest.mock('../src/constants/colors', () => ({
  Colors: {
    primary: 'blue',
    secondary: 'gray',
    accent: 'green',
    onSecondary: 'black',
    onAccent: 'white',
    overlay: 'rgba(0,0,0,0.1)',
    textSecondary: 'gray',
    textMuted: 'lightgray',
  },
}));

jest.mock('../src/utils', () => ({
  REACTION_ICONS: {
    0: '❤️',
    1: '👍',
  },
}));

const createMessage = (overrides?: Partial<MessageType>): MessageType => ({
  id: 1,
  text: 'Hello world!',
  from: 1,
  type: 0,
  replyTo: null,
  url: null,
  reactions: { value: 0, count: 0 },
  ...overrides,
});

describe('Message Component', () => {
  it('renders a basic text message correctly', () => {
    const message = createMessage({ text: 'Hello Testing' });

    render(<Message message={message} />);

    expect(screen.getByText('Hello Testing')).toBeTruthy();
  });

  it('renders an image message when type is 1 and url exists', () => {
    const message = createMessage({
      type: 1,
      url: 'https://picsum.photos/seed/design1/400/300',
      text: 'This text should not appear',
    });

    render(<Message message={message} />);

    expect(screen.queryByText('This text should not appear')).toBeNull();

    const images = screen.UNSAFE_getAllByType(Image);

    expect(images.length).toBe(1);
    expect(images[0].props.source).toEqual({
      uri: 'https://picsum.photos/seed/design1/400/300',
    });
  });
});

describe('Reply Logic', () => {
  it('renders reply context when replyTo is present and lookup finds the message', () => {
    const originalMsg = createMessage({ id: 99, text: 'I am the original' });
    const replyMsg = createMessage({
      id: 100,
      text: 'I am the reply',
      replyTo: 99,
    });

    const lookup = new Map<number, MessageType>();
    lookup.set(99, originalMsg);

    render(<Message message={replyMsg} lookup={lookup} />);

    expect(screen.getByText('I am the original')).toBeTruthy();
    expect(screen.getByText('I am the reply')).toBeTruthy();
  });

  it('renders fallback text when replyTo is present but lookup fails', () => {
    const replyMsg = createMessage({ id: 100, text: 'Reply', replyTo: 999 });
    const lookup = new Map<number, MessageType>();

    render(<Message message={replyMsg} lookup={lookup} />);

    expect(screen.getByText('Original message unavailable')).toBeTruthy();
  });

  it('calls onReplyPress with the correct ID when the reply container is pressed', () => {
    const replyMsg = createMessage({ id: 100, replyTo: 50 });
    const lookup = new Map();
    const onReplyPressMock = jest.fn();

    render(
      <Message
        message={replyMsg}
        lookup={lookup}
        onReplyPress={onReplyPressMock}
      />,
    );

    const replyContainer = screen.getByLabelText('Jump to original message!');

    fireEvent.press(replyContainer);

    expect(onReplyPressMock).toHaveBeenCalledTimes(1);
    expect(onReplyPressMock).toHaveBeenCalledWith(50);
  });
});

describe('Reaction Logic', () => {
  it('renders reaction emoji and count when reactions exist', () => {
    const message = createMessage({
      reactions: { value: 0, count: 5 },
    });

    render(<Message message={message} />);

    expect(screen.getByText('❤️')).toBeTruthy();
    expect(screen.getByText('5')).toBeTruthy();
  });

  it('does not render reaction container if count is 0', () => {
    const message = createMessage({ reactions: { value: 0, count: 0 } });

    render(<Message message={message} />);

    expect(screen.queryByText('❤️')).toBeNull();
  });
});
