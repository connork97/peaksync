"""anotha one

Revision ID: 5f826d3765d2
Revises: 2ad5426dc1fa
Create Date: 2023-05-23 16:44:59.653513

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5f826d3765d2'
down_revision = '2ad5426dc1fa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sessions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_time', sa.DateTime(), nullable=True))
        batch_op.drop_column('date')
        batch_op.drop_column('time')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('sessions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('time', sa.TIME(), nullable=True))
        batch_op.add_column(sa.Column('date', sa.DATE(), nullable=True))
        batch_op.drop_column('date_time')

    # ### end Alembic commands ###
