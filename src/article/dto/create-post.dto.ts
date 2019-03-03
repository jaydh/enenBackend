export class CreatePostDTO {
  readonly id: string;
  readonly link: string;
  readonly metadata?: any;
  readonly HTMLData?: string;
  readonly fetching?: boolean;
}
